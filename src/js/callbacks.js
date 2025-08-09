window.addEventListener('DOMContentLoaded', () => {
    class CallbackTimer {
        constructor() {
            this.timers = [];
            this.intervals = {};
            this.audioContext = null;
            this.beepInterval = null;
            this.init();
        }

        init() {
            this.loadFromStorage();
            this.setupEventListeners();
            this.startCountdowns();
            $('.ui.dropdown').dropdown();
        }

        setupEventListeners() {
            $('#timerForm').on('submit', (e) => {
                e.preventDefault();
                this.addTimer();
            });

            $('#callbackTime').on('change', () => {
                const isCustom = $('#callbackTime').val() === 'custom';
                $('#customTimeField').toggleClass('active', isCustom);
            });
        }

        addTimer() {
            const refNumber = $('#refNumber').val().trim();
            const timeSelect = $('#callbackTime').val();
            let totalSeconds;

            if (timeSelect === 'custom') {
                const hours = parseInt($('#customHours').val()) || 0;
                const minutes = parseInt($('#customMinutes').val()) || 0;
                const seconds = parseInt($('#customSeconds').val()) || 0;
                
                totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
                
                if (totalSeconds <= 0) {
                    alert('Please enter a valid custom time');
                    return;
                }
            } else {
                totalSeconds = parseInt(timeSelect) * 60;
            }

            if (!refNumber) {
                alert('Please enter a reference number');
                return;
            }

            const timer = {
                id: Date.now(),
                refNumber,
                duration: totalSeconds,
                remaining: totalSeconds,
                expired: false,
                acknowledged: false
            };

            this.timers.push(timer);
            this.saveToStorage();
            this.renderTimers();
            this.startCountdown(timer.id);

            // Reset form
            $('#refNumber').val('');
            $('#customHours').val('0');
            $('#customMinutes').val('0');
            $('#customSeconds').val('0');
            $('#callbackTime').dropdown('set selected', '5');
            $('#customTimeField').removeClass('active');
        }

        startCountdowns() {
            this.timers.forEach(timer => {
                if (!timer.acknowledged) {
                    this.startCountdown(timer.id);
                }
            });
        }

        startCountdown(timerId) {
            if (this.intervals[timerId]) {
                clearInterval(this.intervals[timerId]);
            }

            this.intervals[timerId] = setInterval(() => {
                const timer = this.timers.find(t => t.id === timerId);
                if (!timer || timer.acknowledged) {
                    clearInterval(this.intervals[timerId]);
                    return;
                }

                timer.remaining--;
                
                if (timer.remaining <= 0 && !timer.expired) {
                    timer.expired = true;
                    this.startBeeping();
                }

                this.renderTimers();
                this.saveToStorage();
            }, 1000);
        }

        startBeeping() {
            if (this.beepInterval) return;

            this.createBeepSound();
            this.beepInterval = setInterval(() => {
                this.playBeep();
            }, 1000);
        }

        stopBeeping() {
            if (this.beepInterval) {
                clearInterval(this.beepInterval);
                this.beepInterval = null;
            }
        }

        createBeepSound() {
            try {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log('Web Audio API not supported');
            }
        }

        playBeep() {
            if (!this.audioContext) return;

            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.2);
        }

        acknowledgeTimer(timerId) {
            const timer = this.timers.find(t => t.id === timerId);
            if (timer) {
                timer.acknowledged = true;
                timer.expired = false;
                clearInterval(this.intervals[timerId]);
                
                // Always check and stop beeping after acknowledging any timer
                this.checkAndStopBeeping();
                
                this.renderTimers();
                this.saveToStorage();
            }
        }

        checkAndStopBeeping() {
            // Check if any timers are still expired and not acknowledged
            const hasActiveExpired = this.timers.some(t => t.expired && !t.acknowledged);
            if (!hasActiveExpired) {
                this.stopBeeping();
            }
        }

        removeTimer(timerId) {
            this.timers = this.timers.filter(t => t.id !== timerId);
            clearInterval(this.intervals[timerId]);
            delete this.intervals[timerId];
            
            // Always check and stop beeping after removing any timer
            this.checkAndStopBeeping();
            
            this.renderTimers();
            this.saveToStorage();
        }

        formatTime(seconds) {
            const hrs = Math.floor(Math.abs(seconds) / 3600);
            const mins = Math.floor((Math.abs(seconds) % 3600) / 60);
            const secs = Math.abs(seconds) % 60;
            
            let result = '';
            if (hrs > 0) result += `${hrs.toString().padStart(2, '0')}:`;
            result += `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            
            return seconds < 0 ? `-${result}` : result;
        }

        renderTimers() {
            const listEl = $('#timerList');
            
            if (this.timers.length === 0) {
                listEl.html('<div class="item" style="text-align: center; color: #999;">No active timers</div>');
                return;
            }

            const html = this.timers.map(timer => {
                const timeDisplay = this.formatTime(timer.remaining);
                const isExpired = timer.expired && !timer.acknowledged;
                const statusClass = timer.acknowledged ? 'green' : (isExpired ? 'red' : 'blue');
                const statusText = timer.acknowledged ? 'Acknowledged' : (isExpired ? 'EXPIRED!' : 'Active');

                return `
                    <div class="item timer-item ${isExpired ? 'expired' : ''}" data-timer-id="${timer.id}">
                        <div class="right floated content">
                            ${!timer.acknowledged ? `
                                <button class="ui ${isExpired ? 'red' : 'green'} button acknowledge-btn" onclick="timer.acknowledgeTimer(${timer.id})">
                                    ${isExpired ? 'Acknowledge' : 'Complete'}
                                </button>
                            ` : ''}
                            <button class="ui red icon button remove-btn" onclick="timer.removeTimer(${timer.id})">
                                <i class="trash icon"></i>
                            </button>
                        </div>
                        <div class="content">
                            <div class="header">Ref: ${timer.refNumber}</div>
                            <div class="description">
                                <div class="ui ${statusClass} label">
                                    <i class="clock icon"></i>
                                    ${statusText}
                                </div>
                                <span class="countdown">${timeDisplay}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            listEl.html(html);
        }

        saveToStorage() {
            const data = {
                timers: this.timers,
                timestamp: Date.now()
            };
            localStorage.setItem('callbackTimers', JSON.stringify(data));
        }

        loadFromStorage() {
            const data = localStorage.getItem('callbackTimers');
            if (data) {
                try {
                    const parsed = JSON.parse(data);
                    const timeDiff = Math.floor((Date.now() - parsed.timestamp) / 1000);
                    
                    this.timers = parsed.timers.map(timer => {
                        if (!timer.acknowledged) {
                            timer.remaining -= timeDiff;
                            if (timer.remaining <= 0) {
                                timer.expired = true;
                            }
                        }
                        return timer;
                    });

                    this.renderTimers();
                    
                    // Start beeping if any timer is expired
                    const hasExpired = this.timers.some(t => t.expired && !t.acknowledged);
                    if (hasExpired) {
                        this.startBeeping();
                    }
                } catch (e) {
                    console.error('Error loading from storage:', e);
                }
            }
        }
    }

    // Initialize the timer
    const timer = new CallbackTimer();
});
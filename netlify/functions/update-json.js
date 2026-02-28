exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { label, disable, enable } = JSON.parse(event.body);
        
        // These should be set in your hosting provider's environment variables
        const GITHUB_TOKEN = process.env.GITHUB_TOKEN; 
        const REPO_OWNER = 'nedalturas'; // Replace this
        const REPO_NAME = 'customtools';       // Replace this
        const FILE_PATH = 'src/_data/concern_codes.json'; // Adjust if needed

        const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

        // STEP 1: Get the current file (to get the SHA and current data)
        const getResponse = await fetch(apiUrl, {
            headers: { 
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!getResponse.ok) throw new Error('Failed to fetch current file');
        const fileData = await getResponse.json();

        // GitHub sends content in Base64, so we must decode it first
        const currentContent = Buffer.from(fileData.content, 'base64').toString('utf-8');
        const jsonArray = JSON.parse(currentContent);

        let commitMessage = '';

        if (label) {
            // Add new label
            const maxId = jsonArray.reduce((max, item) => Math.max(max, parseInt(item.id)), 0);
            const newId = (maxId + 1).toString();
            jsonArray.push({ id: newId, label: label, disabled: false });
            commitMessage = `Add new concern label: ${label}`;
        } else if (disable) {
            // Disable a concern code
            const itemIndex = jsonArray.findIndex(item => item.id === disable);
            if (itemIndex !== -1) {
                jsonArray[itemIndex].disabled = true;
                commitMessage = `Disable concern code: ${jsonArray[itemIndex].label}`;
            } else {
                throw new Error('Concern code not found');
            }
        } else if (enable) {
            // Enable a concern code
            const itemIndex = jsonArray.findIndex(item => item.id === enable);
            if (itemIndex !== -1) {
                jsonArray[itemIndex].disabled = false;
                commitMessage = `Enable concern code: ${jsonArray[itemIndex].label}`;
            } else {
                throw new Error('Concern code not found');
            }
        } else {
            throw new Error('No valid action provided');
        }

        // Encode the updated array back to Base64
        const newContentBase64 = Buffer.from(JSON.stringify(jsonArray, null, 4)).toString('base64');

        // STEP 2: Commit the updated file back to GitHub
        const putResponse = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: commitMessage,
                content: newContentBase64,
                sha: fileData.sha // Required! This proves we are updating the latest version
            })
        });

        if (!putResponse.ok) throw new Error('Failed to commit update to GitHub');

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Successfully updated concern codes.' })
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};
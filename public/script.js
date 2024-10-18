// Select all buttons and convert NodeList to Array
const btns = document.querySelectorAll('button');
const btnArr = Array.from(btns);

// Add event listeners to each button
btnArr.forEach(btn => {
    btn.addEventListener('click', () => {
        switch (btn.id) {
            case 'boldButton':
                toggleTag('b');
                break;
            case 'italicButton':
                toggleTag('i');
                break;
            case 'underlineButton':
                toggleTag('u');
                break;
            case 'supButton':
                toggleTag('sup');
                break;
            case 'subButton':
                toggleTag('sub');
                break;
            case 'strikeButton':
                toggleTag('s');
                break;
            case 'markButton':
                toggleTag('mark');
                break;
            case 'saveButton':
                saveFile();
                break;
            case 'del':
                delFile();
                break;
            default:
                break;
        }
    });
});

// Function to toggle tags around selected text
function toggleTag(tag) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText) {
        const parentTag = selection.anchorNode.parentElement.tagName.toLowerCase();

        // If the selection is already inside the tag, unwrap it (remove the tag)
        if (parentTag === tag) {
            const parent = selection.anchorNode.parentElement;
            parent.replaceWith(document.createTextNode(parent.textContent));
        } else {
            // Else, wrap the selected text in the new tag
            const newTag = document.createElement(tag);
            newTag.textContent = selectedText;
            range.deleteContents();
            range.insertNode(newTag);
        }
    }
}

// Function to save content to local storage
function saveFile() {
    const fileName = prompt("Enter file name to save:");
    if (fileName) {
        const content = document.querySelector('.content_div').innerHTML;
        localStorage.setItem(fileName, content);
        updateFileList();  // Update the file list with the new file
    }
}

// Function to update file list from local storage
function updateFileList() {
    const fileListUl = document.getElementById('fileListUl');
    fileListUl.innerHTML = ''; // Clear current list

    for (let i = 0; i < localStorage.length; i++) {
        const fileName = localStorage.key(i);
        const listItem = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = fileName;
        button.className = "btn btn-outline-dark m-1";
        button.addEventListener('click', () => {
            loadFile(fileName);
        });
        listItem.appendChild(button);
        fileListUl.appendChild(listItem);
    }
}

// Function to load file content into the editor
function loadFile(fileName) {
    const fileContent = localStorage.getItem(fileName);
    if (fileContent) {
        document.querySelector('.content_div').innerHTML = fileContent;
    } else {
        alert("File not found!");
    }
}

function delFile() {
    let keyname = prompt('name of file to delete');
    localStorage.removeItem(keyname);
}

// Load file list on page load
window.onload = updateFileList;

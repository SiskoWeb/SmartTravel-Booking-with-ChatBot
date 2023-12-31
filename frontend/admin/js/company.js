

const API_BASE_URL = 'http://localhost/travel/backend/company.php';
const Image_BASE_URL = 'http://localhost/travel/backend/';

// DOM elements
const btnForm = document.getElementById('btnForm');
const companiesTable = document.getElementById('companiesTable');
const img = document.getElementById('img');
const imgDisplay = document.getElementById('imgDisplay');
const name = document.getElementById('name');

const error_msg = document.getElementById('error_msg');

let compines = [];
let idItemUpdate = null;



//
document.addEventListener('DOMContentLoaded', () => {
    btnForm.addEventListener('click', onBtnFormClick);
    onLoadBuildTable();
});

//when user change old image display it
img.addEventListener('change', handleImageSelection);


// Function to handle image selection
function handleImageSelection() {
    const selectedImage = img.files[0];

    if (selectedImage) {
        // Create a URL for the selected image
        const imageURL = URL.createObjectURL(selectedImage);

        // Update the src attribute of the displayedImage
        imgDisplay.src = imageURL;


    } else {

        imgDisplay.value = '';
        imgDisplay.src = '';
        imgDisplay.classList.add('hidden')
    }
}


async function onRemoveRoute(id) {
    try {
        await fetch(`${API_BASE_URL}?action=delete&id=${id}`, { method: 'DELETE' });
        onLoadBuildTable();
    } catch (error) {
        console.error("Error deleting route:", error);
    }
}

//this function bring data from server and send it to
// function <buildTable> to create
async function onLoadBuildTable() {
    try {
        const routePromise = await fetch(API_BASE_URL);
        const data = await routePromise.json();
        compines = data;

       
            companiesTable.innerHTML = '';
            data.forEach(company => buildTable(companiesTable, company));
      
    } catch (error) {
        console.error("Error fetching compines:", error);
    }
}


//this function for item in tables 
//required:table body and data 
function buildTable(companiesTable, data) {
    const trTable = document.createElement('tr');
    trTable.classList = 'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted';
    trTable.innerHTML = `
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">${data.name}</td>
        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 table-cell"><img src="${Image_BASE_URL}${data.image}" class="rounded-md object-cover" alt="Beta Corp Logo" width="64" height="64" style="aspect-ratio: 64 / 64; object-fit: cover;"></td>


        <td class="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            <div class="flex space-x-2">
                <button onclick='onEditBtnRoute(${data.id})' class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-[100px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1">
                        <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z"></path>
                    </svg>
                    Edit
                </button>
                <button onclick='onRemoveRoute(${data.id})'  class="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-[100px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 mr-1">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                    Delete
                </button>
            </div>
        </td>`;

    companiesTable.appendChild(trTable);
}

function onEditBtnRoute(id) {
    idItemUpdate = id;

    // get data route admin wants to update by id
    let compnyEdit = compines.find((item) => item.id === id);
    //change  btnForm To Become Update
    btnForm.textContent = 'Update';
    // fill data route to inputs to update it
    name.value = compnyEdit.name;
    imgDisplay.src = `${Image_BASE_URL}${compnyEdit.image}`;
    imgDisplay.classList.remove('hidden')

}




// on click BtnForm
async function onBtnFormClick() {

    //validation inputs
    if (name.value.trim() === '') {
        return error_msg.textContent = 'name is Required'
    }
    if (img.files.length === 0) {
        return error_msg.textContent = 'image is Required'
    }





    //create formdata to send it to server
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('img', img.files[0]);


    if (btnForm.textContent === 'Update') {
        if (idItemUpdate === null) return error_msg.textContent = 'chose item first'


        try {
            console.log('update')
            let routePromise = await fetch(`${API_BASE_URL}?action=update&id=${idItemUpdate}`, {
                method: 'POST',

                body: formData,
            });



            let response = await routePromise.json();
            console.log(response);
            console.log('update');
            onLoadBuildTable();

            clearForm()
            //change  btnForm To Become create
            btnForm.textContent = 'Create'
        } catch (error) {
            console.log('update')
            console.error(error);
        }


    } else {

        console.log('create')
        try {
            let routePromise = await fetch(`${API_BASE_URL}?action=create`, {
                method: 'POST',

                body: formData,
            });



            let response = await routePromise.json();
            console.log(response);

            onLoadBuildTable();
            clearForm()
            btnForm.textContent = 'Create'
        } catch (error) {
            console.error(error);
        }

        console.log('create')
    }
}

function clearForm() {
    img.value = '';

    name.value = '';
    imgDisplay.value = '';
    imgDisplay.src = '';
    imgDisplay.classList.add('hidden')
 
    idItemUpdate = null;
}

function fillInputsWithUpdate(selectElement, optionValue) {
    const option = document.createElement('option');
    option.value = optionValue;
    option.text = optionValue;
    option.selected = true;
    selectElement.appendChild(option);
}

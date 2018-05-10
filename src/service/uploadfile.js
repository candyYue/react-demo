{/* <input type="file" id="upload" style="display:none" @change="saveFile"> */}
// function saveFile(e){
//     const file = e.target.files[0];
// }

const formData = new FormData();
formData.append("ccsv", this.file, this.file.name);
const request = new XMLHttpRequest();
request.open("POST", '/account/Customer/importCustomer', true);
request.send(formData);
request.onreadystatechange = () => {
    if (request.readyState === 4) {
        if (request.status === 200) {
            let response = JSON.parse(request.response);
            self.handleSuccess(response)
        }
    }
};
export function getBase64Str(file) {
    return new Promise(resolve => {

        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function(e) {
            resolve(e.target.result)
           // this.formData.brandLogo = e.target.result;
            //this.imageUrl = e.target.result;
        }
    })

}
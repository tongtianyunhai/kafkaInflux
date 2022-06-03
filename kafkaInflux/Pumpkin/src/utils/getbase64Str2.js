let base64 ={
    getbase64Str(file){
        return new Promise(resolve => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload= e=> {

                resolve(e.target.result);
            }

        })

    }

}
export default base64;



module.exports = (temp,data)=>{
    if(data){
        let output= temp.replace(/{%PRODUCT__TITLE%}/g, data.title);
        output = output.replace(/{%PRODUCT__BODY%}/g, data.body);
        output = output.replace(/{%PRODUCT__LINK%}/g, data.id);
        return output;
    }
};
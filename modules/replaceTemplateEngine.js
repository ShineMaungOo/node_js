module.exports = (temp,data)=>{
    let output= temp.replace(/{%PRODUCT__TITLE%}/g, data.title);
    // const description= title.replace('{%PRODUCT__BODY%}', data.body);
    output = output.replace(/{%PRODUCT__BODY%}/g, data.body);
    output = output.replace(/{%PRODUCT__LINK%}/g, data.id);
    // title = title.replace('{%PRODUCT__DETAIL%}', data);
    return output;
};
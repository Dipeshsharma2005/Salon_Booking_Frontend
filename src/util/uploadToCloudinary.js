export const uploadToCloudinary = async(pics)=>{

    const cloud_name= "ddrtdmffd";

    if(pics){
        const data = new FormData();
        data.append('file', pics);
        data.append('upload_preset', "Salon_Booking");
        data.append('cloud_name', cloud_name);

        const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            {
            method: 'POST',
            body: data
            }
         )

         const fileData = await res.json();
         return fileData.url;
    }
    else{
        console.log("No image uploaded")
    }
}
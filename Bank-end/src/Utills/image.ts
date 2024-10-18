import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: "public_KpGlCIypPsWuxR/TqBju34b0ZAg=",
    privateKey: "private_LXZM6EyVB/UuGv7tZxQ0rJhQoWI=",
    urlEndpoint :"https://ik.imagekit.io/piymhb0xq"
});

export async function uploadImage(file: Buffer, fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        imagekit.upload({
            file: file, // Can be a file path or base64 encoded string
            fileName: fileName
        }, function (error, result) {
            console.log('utyuytewei7u4yb3trcex',error)
            if (error) reject(error);
            if(!result){}
            else resolve(result.url); // Resolve with the URL of the uploaded image
        });
    });
}

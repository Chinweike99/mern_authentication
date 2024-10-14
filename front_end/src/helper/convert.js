/**
 * Converts a file object (such as an image) to a Base64-encoded string.
 * 
 * This function uses the `FileReader` API to read the contents of a file as a Data URL, 
 * which represents the file data in a Base64-encoded format. It returns a promise that 
 * resolves with the Base64 string if the reading operation is successful, or rejects with 
 * an error if the operation fails.
 * 
 * @param {File} file - The file to be converted, typically obtained from an input element.
 * @returns {Promise<string>} A promise that resolves to a Base64-encoded string representation 
 *                            of the file's data.
 * 
 * @example
 * // Example usage:
 * ConvertToBase64(file)
 *     .then(base64String => {
 *         console.log('Base64 string:', base64String);
 *     })
 *     .catch(error => {
 *         console.error('Error converting file to Base64:', error);
 *     });
 */

export const ConvertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror = () => {
            reject(fileReader.error);
        };
    });
};

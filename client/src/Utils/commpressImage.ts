import imageCompression from 'browser-image-compression';

export const compressImage = async (file: File) => {
  if (file) {
    const options = {
      maxSizeMb: 1,
      useWebWorker: true,
      maxIteration: 1,
      fileType: 'image/webp',
    };
    return new Promise<any>(async (resolve, reject) => {
      if (file.type.split('/')[0] === 'image') {
        const compressedFile = await imageCompression(file, options);
        if (compressedFile) {
          return resolve(compressedFile);
        }
      }
      return resolve(false);
    });
  }
  return false;
};

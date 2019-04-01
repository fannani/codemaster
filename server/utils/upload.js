import shortid from 'shortid';
import fs from "fs";

const UPLOAD_DIR = './dist/uploads';

export const storeFS = ({ stream }) => {
  const id = shortid.generate();
  const path = `${UPLOAD_DIR}/${id}`;
  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated) fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path })),
  );
};

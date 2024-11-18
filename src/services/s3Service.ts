import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// Initialize the S3 client
const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;

export async function uploadToS3(file: File, carName: string, ownerName: string): Promise<string> {
  const key = `${Date.now()}-${file.name}`;
  
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: file.type,
    Metadata: {
      carName,
      ownerName,
    },
  });

  await s3Client.send(command);
  
  // Generate a pre-signed URL for downloading
  const getCommand = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  
  const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });
  return url;
}
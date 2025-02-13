import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
  endpoint: `https://nyc3.digitaloceanspaces.com`,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.SPACES_KEY!,
    secretAccessKey: process.env.SPACES_SECRET!,
  },
})

export async function uploadToSpaces(file: File, folder: string): Promise<string> {
  if (!file) {
    throw new Error("File is required for upload.");
  }

  const fileName = `${folder}/${Date.now()}-${file.name}`;

  try {
    console.log("Uploading file:", fileName);

    const fileBuffer = await file.arrayBuffer();

    const upload = await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.SPACES_NAME,  // Ensure this is the correct bucket name
        Key: fileName,
        Body: Buffer.from(fileBuffer), // Convert ArrayBuffer to Buffer
        ACL: "public-read",
        ContentLength: file.size,
        ContentType: file.type,
      })
    );

    console.log('upload', upload);

    const fileURL = `https://${process.env.SPACES_NAME}.nyc3.digitaloceanspaces.com/${fileName}`;
    console.log("File uploaded successfully:", fileURL);

    return fileURL;
  } catch (error) {
    console.error("Error uploading to DigitalOcean Spaces:", error);
    throw new Error("File upload failed.");
  }
}


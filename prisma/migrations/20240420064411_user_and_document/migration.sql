-- CreateTable
CREATE TABLE "Document" (
    "document_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "upload_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("document_id")
);

-- CreateTable
CREATE TABLE "Sharing" (
    "sharing_id" SERIAL NOT NULL,
    "document_id" INTEGER NOT NULL,
    "shared_with_user_id" INTEGER NOT NULL,
    "permission_level" TEXT NOT NULL,
    "shared_by_user_id" INTEGER NOT NULL,

    CONSTRAINT "Sharing_pkey" PRIMARY KEY ("sharing_id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharing" ADD CONSTRAINT "Sharing_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "Document"("document_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharing" ADD CONSTRAINT "Sharing_shared_with_user_id_fkey" FOREIGN KEY ("shared_with_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharing" ADD CONSTRAINT "Sharing_shared_by_user_id_fkey" FOREIGN KEY ("shared_by_user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

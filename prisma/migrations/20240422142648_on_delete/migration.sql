-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Sharing" DROP CONSTRAINT "Sharing_document_id_fkey";

-- DropForeignKey
ALTER TABLE "Sharing" DROP CONSTRAINT "Sharing_shared_by_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Sharing" DROP CONSTRAINT "Sharing_shared_with_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharing" ADD CONSTRAINT "Sharing_document_id_fkey" FOREIGN KEY ("document_id") REFERENCES "Document"("document_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharing" ADD CONSTRAINT "Sharing_shared_with_user_id_fkey" FOREIGN KEY ("shared_with_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sharing" ADD CONSTRAINT "Sharing_shared_by_user_id_fkey" FOREIGN KEY ("shared_by_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "reset_password_token" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "reset_password_token_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reset_password_token" ADD CONSTRAINT "reset_password_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

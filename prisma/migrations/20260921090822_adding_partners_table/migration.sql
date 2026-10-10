-- CreateTable
CREATE TABLE "partners" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "partner_name_en" VARCHAR(255) NOT NULL,
    "partner_name_ar" VARCHAR(255) NOT NULL,
    "partner_description_en" TEXT NOT NULL,
    "partner_description_ar" TEXT NOT NULL,
    "logo" VARCHAR(255) NOT NULL,
    "reference_link" UUID,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

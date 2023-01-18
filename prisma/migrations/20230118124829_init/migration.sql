-- CreateTable
CREATE TABLE "Planet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "diameter" INTEGER NOT NULL,
    "moons" INTEGER NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Planet_pkey" PRIMARY KEY ("id")
);

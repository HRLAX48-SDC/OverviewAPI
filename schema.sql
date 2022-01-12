DROP TABLE IF EXISTS "product" CASCADE;

CREATE TABLE "product" (
  "id" BIGSERIAL NOT NULL,
  "name" VARCHAR(100) NULL DEFAULT NULL,
  "slogan" VARCHAR(500) NULL DEFAULT NULL,
  "description" VARCHAR(500) NULL DEFAULT NULL,
  "category" VARCHAR(60) NULL DEFAULT NULL,
  "default_price" VARCHAR(20) NULL DEFAULT NULL,
  PRIMARY KEY ("id")
);


DROP TABLE IF EXISTS "styles" CASCADE;

CREATE TABLE "styles" (
  "id" BIGSERIAL NOT NULL,
  "productid" INTEGER NULL DEFAULT NULL,
  "name" VARCHAR(100),
  "sale_price" VARCHAR(20) NULL DEFAULT NULL,
  "original_price" VARCHAR(20) NULL DEFAULT NULL,
  "default_style" BOOLEAN NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  FOREIGN KEY (productid) REFERENCES product(id)
);


DROP TABLE IF EXISTS "cart" CASCADE;

CREATE TABLE "cart" (
  "id" BIGSERIAL NOT NULL,
  "user_session" INTEGER NOT NULL,
  "product_id" INTEGER DEFAULT NULL,
  "active" BOOLEAN NOT NULL DEFAULT '0',
  PRIMARY KEY ("id"),
  FOREIGN KEY (product_id) REFERENCES product(id)
);


DROP TABLE IF EXISTS "photos" CASCADE;

CREATE TABLE "photos" (
  "id" BIGSERIAL NOT NULL,
  "styleid" INTEGER NULL DEFAULT NULL,
  "url" TEXT NULL DEFAULT NULL,
  "thumbnail_url" TEXT NULL DEFAULT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY (styleid) REFERENCES styles(id)
);



DROP TABLE IF EXISTS "features" CASCADE;

CREATE TABLE "features" (
  "id" BIGSERIAL NOT NULL,
  "product_id" INTEGER NULL DEFAULT NULL,
  "feature" VARCHAR(50) NULL DEFAULT NULL,
  "value" VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY (product_id) REFERENCES product(id)
);



DROP TABLE IF EXISTS "skus" CASCADE;

CREATE TABLE "skus" (
  "id" BIGSERIAL NOT NULL,
  "styleid" INTEGER NULL DEFAULT NULL,
  "size" VARCHAR(10) NOT NULL DEFAULT NULL,
  "quantity" INTEGER NOT NULL DEFAULT NULL,
  PRIMARY KEY ("id"),
  FOREIGN KEY (styleid) REFERENCES style(id)
);


DROP TABLE IF EXISTS "related" CASCADE;

CREATE TABLE "related" (
"id" BIGSERIAL NOT NULL,
"current_product_id" INTEGER NOT NULL,
"related_product_id" INTEGER NOT NULL,
PRIMARY KEY ("id"),
FOREIGN KEY (current_product_id) REFERENCES product(id),
FOREIGN KEY (related_product_id) REFERENCES product(id)
);


-- Load Data from CSV
COPY product FROM '/Users/miles/Desktop/HRImmersive/OverviewAPI/data/product.csv' delimiter ',' csv header;
COPY styles FROM '/Users/miles/Desktop/HRImmersive/OverviewAPI/data/styles.csv' delimiter ',' csv header;
COPY cart FROM '/Users/miles/Desktop/HRImmersive/OverviewAPI/data/cart.csv' delimiter ',' csv header;
COPY photos FROM '/Users/miles/Desktop/HRImmersive/OverviewAPI/data/photos.csv' delimiter ',' csv header;
COPY features FROM '/Users/miles/Desktop/HRImmersive/OverviewAPI/data/features.csv' delimiter ',' csv header;
COPY skus FROM '/Users/miles/Desktop/HRImmersive/OverviewAPI/data/skus.csv' delimiter ',' csv header;
COPY related FROM '/Users/miles/Desktop/HRImmersive/OverviewAPI/data/related.csv' delimiter ',' csv header;

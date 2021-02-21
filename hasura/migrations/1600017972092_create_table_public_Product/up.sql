CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE "public"."Product"("id" uuid NOT NULL DEFAULT gen_random_uuid(), "createdAt" Timestamp NOT NULL DEFAULT now(), "updatedAt" timestamptz NOT NULL DEFAULT now(), "name" text NOT NULL, "description" text, "price" money NOT NULL, PRIMARY KEY ("id") , UNIQUE ("name"));
CREATE OR REPLACE FUNCTION "public"."set_current_timestamp_updatedAt"()
RETURNS TRIGGER AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updatedAt" = NOW();
  RETURN _new;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER "set_public_Product_updatedAt"
BEFORE UPDATE ON "public"."Product"
FOR EACH ROW
EXECUTE PROCEDURE "public"."set_current_timestamp_updatedAt"();
COMMENT ON TRIGGER "set_public_Product_updatedAt" ON "public"."Product" 
IS 'trigger to set value of column "updatedAt" to current timestamp on row update';

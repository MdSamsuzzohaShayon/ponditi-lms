-- =====================================================================
-- Ponditi LMS - Full Schema
-- Compatible with PostgreSQL and SQLite
-- Idempotent: safe to run multiple times
-- =====================================================================

-- Enable FK enforcement in SQLite (no-op on PostgreSQL)
PRAGMA foreign_keys = ON;

-- ---------------------------------------------------------------------
-- 1. ClassType
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "ClassType" (
    "id"   INTEGER PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL UNIQUE
);

-- ---------------------------------------------------------------------
-- 2. Subject
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Subject" (
    "id"   INTEGER PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL UNIQUE
);

-- ---------------------------------------------------------------------
-- 3. Tuitionm
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Tuitionm" (
    "id"   INTEGER PRIMARY KEY,
    "name" VARCHAR(100) NOT NULL UNIQUE
);

-- ---------------------------------------------------------------------
-- 4. Customer
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Customer" (
    "id"             INTEGER PRIMARY KEY,
    "name"           VARCHAR(100),
    "password"       VARCHAR(255),
    "phone"          VARCHAR(100),
    "image"          VARCHAR(255),
    "cc"             VARCHAR(100),
    "email"          VARCHAR(255),
    "district"       VARCHAR(255),
    "presentaddress" VARCHAR(255),
    "role"           VARCHAR(100),
    "age"            INTEGER,
    "gender"         VARCHAR(15)  NOT NULL DEFAULT 'MALE',
    "id_proof"       VARCHAR(100),
    "profession"     VARCHAR(100),
    "institution"    VARCHAR(225),
    "experience"     VARCHAR(100),
    "otp"            VARCHAR(100),
    "isActive"       VARCHAR(50)  NOT NULL DEFAULT 'PENDING',
    "isVerified"     BOOLEAN      NOT NULL DEFAULT FALSE,
    "tutionplace"    VARCHAR(70)  DEFAULT 'ONLINE',
    "tuitionmedium"  VARCHAR(70)  DEFAULT 'BANGLA',
    "isAvailable"    BOOLEAN      DEFAULT TRUE,
    "tl_rate"        INTEGER,
    "sl_rate"        INTEGER,
    "ol_rate"        INTEGER,
    "totalHours"     INTEGER,
    "ref"            INTEGER
);

-- ---------------------------------------------------------------------
-- 5. Education
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Education" (
    "id"            INTEGER PRIMARY KEY,
    "level"         VARCHAR(255) NOT NULL,
    "major"         VARCHAR(255),
    "institution"   VARCHAR(255),
    "passing_year"  INTEGER,
    "running_study" BOOLEAN      DEFAULT FALSE,
    "CustomerId"    INTEGER,
    CONSTRAINT "fk_education_customer"
        FOREIGN KEY ("CustomerId") REFERENCES "Customer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- ---------------------------------------------------------------------
-- 6. Notification
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Notification" (
    "id"         INTEGER PRIMARY KEY,
    "type"       VARCHAR(255) NOT NULL,
    "comment"    VARCHAR(255),
    "viewed"     BOOLEAN      NOT NULL DEFAULT FALSE,
    "CustomerId" INTEGER,
    CONSTRAINT "fk_notification_customer"
        FOREIGN KEY ("CustomerId") REFERENCES "Customer"("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ---------------------------------------------------------------------
-- 7. Notroom
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Notroom" (
    "id"                INTEGER PRIMARY KEY,
    "name"              VARCHAR(20) NOT NULL,
    "status"            VARCHAR(20) NOT NULL DEFAULT 'RUNNING',
    "notroominvitorId"  INTEGER,
    "invitereceiverId"  INTEGER,
    CONSTRAINT "fk_notroom_invitor"
        FOREIGN KEY ("notroominvitorId") REFERENCES "Customer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "fk_notroom_receiver"
        FOREIGN KEY ("invitereceiverId") REFERENCES "Customer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- ---------------------------------------------------------------------
-- 8. Room
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Room" (
    "id"               INTEGER PRIMARY KEY,
    "name"             VARCHAR(20) NOT NULL,
    "status"           VARCHAR(20) NOT NULL DEFAULT 'RUNNING',
    "invitorId"        INTEGER,
    "invitereceverId"  INTEGER,
    CONSTRAINT "fk_room_invitor"
        FOREIGN KEY ("invitorId") REFERENCES "Customer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "fk_room_receiver"
        FOREIGN KEY ("invitereceverId") REFERENCES "Customer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- ---------------------------------------------------------------------
-- 9. Message
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Message" (
    "id"                 INTEGER PRIMARY KEY,
    "text"               VARCHAR(255) NOT NULL,
    "publish"            BOOLEAN      NOT NULL DEFAULT FALSE,
    "messagesenderId"    INTEGER,
    "messagereceverId"   INTEGER,
    "RoomId"             INTEGER,
    CONSTRAINT "fk_message_sender"
        FOREIGN KEY ("messagesenderId") REFERENCES "Customer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "fk_message_receiver"
        FOREIGN KEY ("messagereceverId") REFERENCES "Customer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "fk_message_room"
        FOREIGN KEY ("RoomId") REFERENCES "Room"("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ---------------------------------------------------------------------
-- 10. ScheduledClass
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "ScheduledClass" (
    "id"               INTEGER PRIMARY KEY,
    "desc"             TEXT,
    "types"            VARCHAR(100) NOT NULL,
    "status"           VARCHAR(100) NOT NULL,
    "start"            TIMESTAMP,
    "startedat"        TIMESTAMP,
    "meetlink"         VARCHAR(255),
    "terminatedat"     TIMESTAMP,
    "tuitionlocation"  VARCHAR(255),
    "perHourRate"      INTEGER,
    "senderId"         INTEGER,
    "receverId"        INTEGER,
    "ClassTypeId"      INTEGER,
    "SubjectId"        INTEGER,
    CONSTRAINT "fk_schedclass_sender"
        FOREIGN KEY ("senderId") REFERENCES "Customer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "fk_schedclass_receiver"
        FOREIGN KEY ("receverId") REFERENCES "Customer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "fk_schedclass_classtype"
        FOREIGN KEY ("ClassTypeId") REFERENCES "ClassType"("id")
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "fk_schedclass_subject"
        FOREIGN KEY ("SubjectId") REFERENCES "Subject"("id")
        ON DELETE SET NULL ON UPDATE CASCADE
);

-- ---------------------------------------------------------------------
-- 11. Review
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS "Review" (
    "id"              INTEGER PRIMARY KEY,
    "stars"           INTEGER NOT NULL,
    "comment"         TEXT    NOT NULL,
    "publish"         BOOLEAN NOT NULL DEFAULT FALSE,
    "reviewerId"      INTEGER,
    "reviewtakerId"   INTEGER,
    "ScheduledClassId" INTEGER,
    CONSTRAINT "fk_review_reviewer"
        FOREIGN KEY ("reviewerId") REFERENCES "Customer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "fk_review_taker"
        FOREIGN KEY ("reviewtakerId") REFERENCES "Customer"("id")
        ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "fk_review_schedclass"
        FOREIGN KEY ("ScheduledClassId") REFERENCES "ScheduledClass"("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- =====================================================================
-- MANY-TO-MANY JUNCTION TABLES
-- Sequelize auto-generates these; we create them explicitly so the
-- schema is self-contained.
-- =====================================================================

-- ClassType <-> Tuitionm
CREATE TABLE IF NOT EXISTS "TuitionmToClasstype" (
    "ClassTypeId" INTEGER NOT NULL,
    "TuitionmId"  INTEGER NOT NULL,
    PRIMARY KEY ("ClassTypeId", "TuitionmId"),
    CONSTRAINT "fk_ttc_classtype"
        FOREIGN KEY ("ClassTypeId") REFERENCES "ClassType"("id")
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "fk_ttc_tuitionm"
        FOREIGN KEY ("TuitionmId") REFERENCES "Tuitionm"("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ClassType <-> Subject
CREATE TABLE IF NOT EXISTS "SubjectToClasstype" (
    "ClassTypeId" INTEGER NOT NULL,
    "SubjectId"   INTEGER NOT NULL,
    PRIMARY KEY ("ClassTypeId", "SubjectId"),
    CONSTRAINT "fk_stc_classtype"
        FOREIGN KEY ("ClassTypeId") REFERENCES "ClassType"("id")
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "fk_stc_subject"
        FOREIGN KEY ("SubjectId") REFERENCES "Subject"("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- ClassType <-> Customer
CREATE TABLE IF NOT EXISTS "CustomerToClasstype" (
    "ClassTypeId" INTEGER NOT NULL,
    "CustomerId"  INTEGER NOT NULL,
    PRIMARY KEY ("ClassTypeId", "CustomerId"),
    CONSTRAINT "fk_ctc_classtype"
        FOREIGN KEY ("ClassTypeId") REFERENCES "ClassType"("id")
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "fk_ctc_customer"
        FOREIGN KEY ("CustomerId") REFERENCES "Customer"("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Subject <-> Customer
CREATE TABLE IF NOT EXISTS "CustomerToSubject" (
    "CustomerId" INTEGER NOT NULL,
    "SubjectId"  INTEGER NOT NULL,
    PRIMARY KEY ("CustomerId", "SubjectId"),
    CONSTRAINT "fk_cts_customer"
        FOREIGN KEY ("CustomerId") REFERENCES "Customer"("id")
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "fk_cts_subject"
        FOREIGN KEY ("SubjectId") REFERENCES "Subject"("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- Customer <-> Tuitionm (note: model says "CustomerToTuitionm", not "UniqueCustomerTuitionm")
CREATE TABLE IF NOT EXISTS "CustomerToTuitionm" (
    "CustomerId"  INTEGER NOT NULL,
    "TuitionmId"  INTEGER NOT NULL,
    PRIMARY KEY ("CustomerId", "TuitionmId"),
    CONSTRAINT "fk_ctt_customer"
        FOREIGN KEY ("CustomerId") REFERENCES "Customer"("id")
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "fk_ctt_tuitionm"
        FOREIGN KEY ("TuitionmId") REFERENCES "Tuitionm"("id")
        ON DELETE CASCADE ON UPDATE CASCADE
);
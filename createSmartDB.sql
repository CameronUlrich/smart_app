CREATE TABLE public."Machine"
(
    "machineID" character varying(40) NOT NULL,
    "machineModel" character varying(20),
    "machineOS" character varying(20),
    "machineMake" character varying(20),
    "dateTime" timestamp without time zone NOT NULL,
    PRIMARY KEY ("machineID")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."Machine"
    OWNER to postgres;
    
    
CREATE TABLE public."User"
(
    email character varying(40) NOT NULL,
    "userID" serial NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(20) NOT NULL,
    PRIMARY KEY ("userID")
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."User"
    OWNER to postgres;
    
    
CREATE TABLE public."UserMachine"
(
    "userID" integer NOT NULL,
    "machineID" character varying(40) NOT NULL,
    "dateTime" timestamp without time zone NOT NULL,
    PRIMARY KEY ("userID", "machineID"),
    CONSTRAINT "userFK" FOREIGN KEY ("userID")
        REFERENCES public."User" ("userID") MATCH SIMPLE,
    CONSTRAINT "machineFK" FOREIGN KEY ("machineID")
        REFERENCES public."Machine" ("machineID") MATCH SIMPLE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."UserMachine"
    OWNER to postgres;
    
    
CREATE TABLE public."CPU"
(
    "cpuID" serial NOT NULL,
    "machineID" character varying(40) NOT NULL,
    "cpuModel" character varying(40),
    "cpuSpeed" double precision,
    "cpuPercent" double precision,
    "cpuCoreCount" integer,
    "dateTime" timestamp without time zone NOT NULL,
    PRIMARY KEY ("cpuID", "dateTime"),
    CONSTRAINT "CPUFK" FOREIGN KEY ("machineID")
        REFERENCES public."Machine" ("machineID") MATCH SIMPLE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."CPU"
    OWNER to postgres;


CREATE TABLE public."GPU"
(
    "gpuID" serial NOT NULL,
    "machineID" character varying(40) NOT NULL,
    "gpuModel" character varying(40),
    "gpuSpeed" integer,
    "gpuTemp" integer,
    "gpuMemorySize" double precision,
    "gpuMemoryUsed" double precision,
    "dateTime" timestamp without time zone NOT NULL,
    PRIMARY KEY ("gpuID", "dateTime"),
    CONSTRAINT "GPUFK" FOREIGN KEY ("machineID")
        REFERENCES public."Machine" ("machineID") MATCH SIMPLE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."GPU"
    OWNER to postgres;
    
    
CREATE TABLE public."Disk"
(
    "diskID" serial NOT NULL,
    "machineID" character varying(40) NOT NULL,
    "diskType" character varying(40),
    "diskSize" double precision,
    "diskFree" double precision,
    "diskUsed" double precision,
    "dateTime" timestamp without time zone NOT NULL,
    PRIMARY KEY ("diskID", "dateTime"),
    CONSTRAINT "DiskFK" FOREIGN KEY ("machineID")
        REFERENCES public."Machine" ("machineID") MATCH SIMPLE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."Disk"
    OWNER to postgres;
    

CREATE TABLE public."Memory"
(
    "memoryID" serial NOT NULL,
    "machineID" character varying(40) NOT NULL,
    "memorySize" double precision,
    "memoryUsed" double precision,
    "memoryFree" double precision,
    "dateTime" timestamp without time zone NOT NULL,
    PRIMARY KEY ("memoryID", "dateTime"),
    CONSTRAINT "MemoryFK" FOREIGN KEY ("machineID")
        REFERENCES public."Machine" ("machineID") MATCH SIMPLE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."Memory"
    OWNER to postgres;
    
    
CREATE TABLE public."Network"
(
    "networkID" serial NOT NULL,
    "machineID" character varying(40) NOT NULL,
    "networkCard" character varying(20),
    "networkSpeed" double precision,
    "networkUp" double precision,
    "networkDown" double precision,
    "dateTime" timestamp without time zone NOT NULL,
    PRIMARY KEY ("networkID", "dateTime"),
    CONSTRAINT "NetworkFK" FOREIGN KEY ("machineID")
        REFERENCES public."Machine" ("machineID") MATCH SIMPLE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."Network"
    OWNER to postgres;
    
    
CREATE TABLE public."ActiveProcesses"
(
    "processID" serial NOT NULL,
    "machineID" character varying(40) NOT NULL,
    "processName" character varying(20),
    "cpuPercent" double precision,
    "memoryPecent" double precision,
    "diskPercent" double precision,
    "networkPercent" double precision,
    "dateTime" timestamp without time zone NOT NULL,
    PRIMARY KEY ("processID", "dateTime"),
    CONSTRAINT "ProcessFK" FOREIGN KEY ("machineID")
        REFERENCES public."Machine" ("machineID") MATCH SIMPLE
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."ActiveProcesses"
    OWNER to postgres;
    
    
    
    

\echo 'Delete and recreate jobly db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE wordx_2qxd;
CREATE DATABASE wordx_2qxd;
\connect wordX

\i wordX-schema.sql

\echo 'Delete and recreate jobly_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE wordX_test;
CREATE DATABASE wordX_test;
\connect wordX_test

\i wordX-schema.sql

//1. import required librqries
const express = require('express');
const { GoogleGenerativeAI } =require("@google/generative-ai")
const dotenv = require('dotenv')
dotenv.config();
const mysql = require('mysql2');


const app = express();
const port = 3000;
// Middleware to parse JSON bodies
app.use(express.json());


// Access your API key as an environment variable (see "Set up your API key" above)
console.log(process.env.GEMINI)
const genAI = new GoogleGenerativeAI(process.env.GEMINI);


// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



const connection = mysql.createConnection({
    host: 'localhost', // Your MySQL host
    user: 'root', // Your MySQL username
    password: 'admin', // Your MySQL password
    database: 'insight_plus', // Your MySQL database name
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
        return;
    }
    console.log('Connected to MySQL database!');
});

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost', // Your MySQL host
    user: 'root', // Your MySQL username
    password: 'admin', // Your MySQL password
    database: 'insight_plus', // Your MySQL database name
});

var schema = `
DROP TABLE IF EXISTS branch;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE branch (
  id_branch bigint NOT NULL AUTO_INCREMENT,
  date_timeof_creation datetime DEFAULT NULL,
  id_partner bigint DEFAULT NULL,
  id_point_of_presence bigint DEFAULT NULL,
  is_activated bit(1) DEFAULT NULL,
  latest_update datetime DEFAULT NULL,
  name_branch varchar(64) NOT NULL,
  x_coor double DEFAULT NULL,
  y_coor double DEFAULT NULL,
  PRIMARY KEY (id_branch),
  KEY FK7qhrveoawen2end7mtwf7ax07 (id_partner),
  KEY FKcy3h6qgfdyp3qy7q8ip0ern9o (id_point_of_presence),
  CONSTRAINT FK7qhrveoawen2end7mtwf7ax07 FOREIGN KEY (id_partner) REFERENCES partner (id_partner),
  CONSTRAINT FKcy3h6qgfdyp3qy7q8ip0ern9o FOREIGN KEY (id_point_of_presence) REFERENCES point_of_presence (id_point_of_presence)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table brand
--

DROP TABLE IF EXISTS brand;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE brand (
  id_brand bigint NOT NULL AUTO_INCREMENT,
  is_activated bit(1) DEFAULT NULL,
  name_brand varchar(64) NOT NULL,
  PRIMARY KEY (id_brand),
  UNIQUE KEY UK_nc3r9kesq4tjbnv4bsk487keh (name_brand)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table extracted_file
--

DROP TABLE IF EXISTS extracted_file;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE extracted_file (
  id_extracted_file bigint NOT NULL AUTO_INCREMENT,
  log_filename varchar(255) DEFAULT NULL,
  term_id varchar(255) DEFAULT NULL,
  PRIMARY KEY (id_extracted_file)
) ENGINE=InnoDB AUTO_INCREMENT=2211 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table h22operation
--

DROP TABLE IF EXISTS h22operation;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE h22operation (
  id_operation bigint NOT NULL,
  code_reponse varchar(255) DEFAULT NULL,
  date date DEFAULT NULL,
  date_timeof_extraction datetime DEFAULT NULL,
  log_filename varchar(255) DEFAULT NULL,
  montant float NOT NULL,
  numero_carte varchar(255) DEFAULT NULL,
  operation_type varchar(255) DEFAULT NULL,
  raison varchar(255) DEFAULT NULL,
  termid varchar(255) DEFAULT NULL,
  time varchar(255) DEFAULT NULL,
  transaction_id varchar(255) DEFAULT NULL,
  PRIMARY KEY (id_operation)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table p2600operation
--

DROP TABLE IF EXISTS p2600operation;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE p2600operation (
  id_operation bigint NOT NULL,
  account_number varchar(255) DEFAULT NULL,
  amount varchar(255) DEFAULT NULL,
  atm_type varchar(255) DEFAULT NULL,
  bank_number varchar(255) DEFAULT NULL,
  branch_number varchar(255) DEFAULT NULL,
  cycles varchar(2048) DEFAULT NULL,
  date date DEFAULT NULL,
  log_filename varchar(255) DEFAULT NULL,
  remain_count varchar(255) DEFAULT NULL,
  termid varchar(255) DEFAULT NULL,
  time varchar(255) DEFAULT NULL,
  date_timeof_extraction datetime DEFAULT NULL,
  PRIMARY KEY (id_operation)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table p2800operation
--

DROP TABLE IF EXISTS p2800operation;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE p2800operation (
  id_operation bigint NOT NULL,
  account_number varchar(255) DEFAULT NULL,
  amount varchar(255) DEFAULT NULL,
  atm_type varchar(255) DEFAULT NULL,
  bank_number varchar(255) DEFAULT NULL,
  branch_number varchar(255) DEFAULT NULL,
  cycles varchar(2048) DEFAULT NULL,
  date date DEFAULT NULL,
  log_filename varchar(255) DEFAULT NULL,
  remain_count varchar(255) DEFAULT NULL,
  termid varchar(255) DEFAULT NULL,
  time varchar(255) DEFAULT NULL,
  date_timeof_extraction datetime DEFAULT NULL,
  PRIMARY KEY (id_operation)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table partner
--

DROP TABLE IF EXISTS partner;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE partner (
  id_partner bigint NOT NULL AUTO_INCREMENT,
  category int NOT NULL,
  date_timeof_creation datetime DEFAULT NULL,
  is_activated bit(1) NOT NULL,
  latest_update datetime DEFAULT NULL,
  name_partner varchar(64) NOT NULL,
  PRIMARY KEY (id_partner),
  UNIQUE KEY UK_n9i7f5jib3wk6u91ahcxdr90h (name_partner)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table point_of_presence
--

DROP TABLE IF EXISTS point_of_presence;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE point_of_presence (
  id_point_of_presence bigint NOT NULL AUTO_INCREMENT,
  date_timeof_creation datetime DEFAULT NULL,
  id_region bigint DEFAULT NULL,
  is_activated bit(1) DEFAULT NULL,
  latest_update datetime DEFAULT NULL,
  quarter varchar(255) NOT NULL,
  town varchar(255) NOT NULL,
  PRIMARY KEY (id_point_of_presence),
  KEY FKsxe0l49o8uo8mprjk94c7fom8 (id_region),
  CONSTRAINT FKsxe0l49o8uo8mprjk94c7fom8 FOREIGN KEY (id_region) REFERENCES region (id_region)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table region
--

DROP TABLE IF EXISTS region;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE region (
  id_region bigint NOT NULL AUTO_INCREMENT,
  date_timeof_creation datetime DEFAULT NULL,
  is_activated bit(1) NOT NULL,
  latest_update datetime DEFAULT NULL,
  name_region varchar(64) NOT NULL,
  PRIMARY KEY (id_region),
  UNIQUE KEY UK_2ewme11a136jjkbvhlhmm5is (name_region)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table terminal
--

DROP TABLE IF EXISTS terminal;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE terminal (
  id_terminal bigint NOT NULL AUTO_INCREMENT,
  comment varchar(254) DEFAULT NULL,
  date_timeof_creation datetime DEFAULT NULL,
  deployment_date datetime DEFAULT NULL,
  id_branch bigint DEFAULT NULL,
  id_terminal_model bigint DEFAULT NULL,
  id_terminal_type bigint DEFAULT NULL,
  is_activated bit(1) DEFAULT NULL,
  latest_update datetime DEFAULT NULL,
  name_terminal varchar(255) DEFAULT NULL,
  serial_number varchar(20) DEFAULT NULL,
  status varchar(255) DEFAULT NULL,
  termid varchar(64) NOT NULL,
  PRIMARY KEY (id_terminal),
  UNIQUE KEY UK_wqhabdwyax1sm60xq3vllpkq (termid),
  KEY FK32pqulgwt5cimcdlpqarqcs9t (id_branch),
  KEY FKr3ogewvggcu6poddc2slo1v6c (id_terminal_model),
  KEY FKks2kkx01mcljcixv6jw2xk58j (id_terminal_type),
  CONSTRAINT FK32pqulgwt5cimcdlpqarqcs9t FOREIGN KEY (id_branch) REFERENCES branch (id_branch),
  CONSTRAINT FKks2kkx01mcljcixv6jw2xk58j FOREIGN KEY (id_terminal_type) REFERENCES terminal_type (id_terminal_type),
  CONSTRAINT FKr3ogewvggcu6poddc2slo1v6c FOREIGN KEY (id_terminal_model) REFERENCES terminal_model (id_terminal_model)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table terminal_model
--

DROP TABLE IF EXISTS terminal_model;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE terminal_model (
  id_terminal_model bigint NOT NULL AUTO_INCREMENT,
  id_brand bigint DEFAULT NULL,
  is_activated bit(1) DEFAULT NULL,
  modelid varchar(255) DEFAULT NULL,
  name_model varchar(64) NOT NULL,
  PRIMARY KEY (id_terminal_model),
  KEY FKs4xa16h1ymwiacfm11eb788uh (id_brand),
  CONSTRAINT FKs4xa16h1ymwiacfm11eb788uh FOREIGN KEY (id_brand) REFERENCES brand (id_brand)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table terminal_type
--

DROP TABLE IF EXISTS terminal_type;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE terminal_type (
  id_terminal_type bigint NOT NULL AUTO_INCREMENT,
  description varchar(250) DEFAULT NULL,
  is_activated bit(1) DEFAULT NULL,
  type varchar(64) NOT NULL,
  PRIMARY KEY (id_terminal_type),
  UNIQUE KEY UK_7ixwasvdh5jugo4nq1xbewa86 (type)


`

// Endpoint to chat with the database
app.post('/chat', async (req, res) => {
    const { prompt } = req.body;
    console.log(prompt)
    try {
        // Append schema details to the prompt or preprocess it as needed
        const enhancedPrompt = `Give me just the mysql query that will answer the prompt "${prompt}" Given the database schema: "${schema} your response should contain just the mysql query with no other text or variable")}`;
        
        console.log(enhancedPrompt);

        // Generate SQL query using Gemini AI with enhanced prompt
        const sqlQueryResponse = await model.generateContent(enhancedPrompt);
        console.log("*****************************");

        console.log("Generated SQL Query:", sqlQueryResponse.response.text());

        // Extract the SQL query from the response
        const sqlQuery = await sqlQueryResponse.response.text().match(/`sql\s*(.*)\s*`/s);
        const cleanSqlQuery = sqlQuery ? sqlQuery[1].trim() : sqlQueryResponse.response.text().trim();

        console.log("Cleaned SQL Query:", cleanSqlQuery.replace(/[`]/g, '').trim()); //remove all backticks and removes any leading or trailing whitespace from the cleaned string.

        // Execute the SQL query against the MySQL database
        const [results] = await pool.promise().query(cleanSqlQuery.replace(/[`]/g, '').trim());

        // Return the query results
        res.json(results);
    } catch (error) {
        console.error("Error processing the request:", error);
        res.status(500).json({ message: "An error occurred while processing your request." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});



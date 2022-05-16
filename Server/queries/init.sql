CREATE SCHEMA marscamp;
USE marscamp;
CREATE TABLE users (
	registration_no VARCHAR(10) NOT NULL,
	phone_no VARCHAR(13) NOT NULL,
    email VARCHAR(100) NOT NULL,
    first_and_last_name VARCHAR(100) NOT NULL,
    user_type VARCHAR(7) NOT NULL,
    pwd VARCHAR(100) NOT NULL,
    CONSTRAINT email_const UNIQUE (email),
    PRIMARY KEY (registration_no)
);

CREATE TABLE courses (
	course_id INT NOT NULL AUTO_INCREMENT,
    course_title VARCHAR(100) NOT NULL,
    course_desc VARCHAR(300) NOT NULL,
    difficulty VARCHAR(30) NOT NULL,
    PRIMARY KEY (course_id)
);

CREATE TABLE student (
	student_id INT NOT NULL AUTO_INCREMENT,
	user_id VARCHAR(10) NOT NULL,
	course_id INT,
    CONSTRAINT fk_stud_user FOREIGN KEY (user_id) REFERENCES users(registration_no) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_stud_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT student_const UNIQUE (user_id, course_id),
    PRIMARY KEY (student_id)
);

CREATE TABLE instructor (
	faculty_id INT NOT NULL AUTO_INCREMENT,
	approval BOOLEAN NOT NULL,
	user_id VARCHAR(10) NOT NULL,
	course_id INT,
    CONSTRAINT fk_inst_user FOREIGN KEY (user_id) REFERENCES users(registration_no) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_inst_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE SET NULL ON UPDATE CASCADE,
    PRIMARY KEY (faculty_id)
);

CREATE TABLE feedback (
	feedback_id INT NOT NULL AUTO_INCREMENT,
    date_and_time DATETIME NOT NULL DEFAULT NOW(),
    content VARCHAR(10000) NOT NULL,
	user_id VARCHAR(10) NOT NULL,
	course_id INT NOT NULL,
    CONSTRAINT fk_fdbk_user FOREIGN KEY (user_id) REFERENCES users(registration_no) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_fdbk_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (feedback_id)
);

CREATE TABLE course_content (
	content_id INT NOT NULL AUTO_INCREMENT,
    date_and_time DATETIME NOT NULL DEFAULT NOW(),
    content VARCHAR(10000) NOT NULL,
	user_id VARCHAR(10) NOT NULL,
	course_id INT NOT NULL,
    content_type VARCHAR(15) NOT NULL,
    title VARCHAR(50) NOT NULL,
    file_path VARCHAR(255) DEFAULT NULL,
    CONSTRAINT fk_crcn_user FOREIGN KEY (user_id) REFERENCES users(registration_no) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_crcn_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (content_id)
);

CREATE TABLE questions (
	question_id INT NOT NULL AUTO_INCREMENT,
    course_id INT NOT NULL,
    content_id INT NOT NULL,
    question VARCHAR (500) NOT NULL,
    choices VARCHAR (1000) NOT NULL,
    CONSTRAINT fk_que_content FOREIGN KEY (content_id) REFERENCES course_content(content_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_que_course FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY(question_id)
);
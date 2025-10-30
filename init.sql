CREATE TABLE userinformation (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    birthday DATE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    weight NUMERIC NOT NULL,
    height NUMERIC NOT NULL,
    activity VARCHAR(20) NOT NULL
);

CREATE TABLE nutrition_calculation (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES userinformation(id),
    bmr NUMERIC NOT NULL,
    tdee NUMERIC NOT NULL,
    protein NUMERIC NOT NULL,
    carb NUMERIC NOT NULL,
    fat NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES userinformation(id),
    meal_type VARCHAR(20) NOT NULL,
    food_name VARCHAR(255) NOT NULL,
    calories NUMERIC NOT NULL,
    protein NUMERIC NOT NULL,
    carb NUMERIC NOT NULL,
    fat NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES userinformation(id),
    token VARCHAR(255) NOT NULL
);
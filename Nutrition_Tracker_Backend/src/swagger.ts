import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Nutrition Tracker API",
            version: "1.0.0",
            description: "API documentation for Nutrition Tracker Backend"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                RegisterRequest: {
                    type: "object",
                    properties: {
                        firstname: { type: "string", example: "John" },
                        lastname: { type: "string", example: "Doe" },
                        gender: { type: "string", example: "Male" },
                        birthday: { type: "string", example: "1995-05-15" },
                        email: { type: "string", example: "john@example.com" },
                        password: { type: "string", example: "123456" },
                        weight: { type: "number", example: 70 },
                        height: { type: "number", example: 175 },
                        activity: { type: "string", example: "Moderate" }
                    }
                },
                RegisterResponse: {
                    type: "object",
                    properties: {
                        message: { type: "string", example: "Registered successfully" },
                        user: {
                            type: "object",
                            properties: {
                                user_id: { type: "number", example: 1 },
                                email: { type: "string", example: "john@example.com" }
                            }
                        }
                    }
                },
                LoginRequest: {
                    type: "object",
                    properties: {
                        email: { type: "string", example: "john@example.com" },
                        password: { type: "string", example: "123456" }
                    }
                },
                LoginResponse: {
                    type: "object",
                    properties: {
                        user: {
                            type: "object",
                            properties: {
                                id: { type: "number", example: 1 },
                                email: { type: "string", example: "john@example.com" }
                            }
                        },
                        accessToken: { type: "string" },
                        refreshToken: { type: "string" }
                    }
                },
                ProfileResponse: {
                    type: "object",
                    properties: {
                        message: { type: "string" },
                        userId: { type: "number" },
                        userInfo: {
                            type: "object",
                            properties: {
                                firstname: { type: "string" },
                                lastname: { type: "string" },
                                gender: { type: "string" },
                                birthday: { type: "string" },
                                email: { type: "string" },
                                weight: { type: "number" },
                                height: { type: "number" },
                                activity: { type: "string" }
                            }
                        }
                    }
                },
                RefreshRequest: {
                    type: "object",
                    properties: {
                        refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIs..." }
                    }
                },
                RefreshResponse: {
                    type: "object",
                    properties: {
                        accessToken: { type: "string" },
                        refreshToken: { type: "string" }
                    }
                },
                LogoutRequest: {
                    type: "object",
                    properties: {
                        refreshToken: { type: "string", example: "eyJhbGciOiJIUzI1NiIs..." }
                    }
                },
                LogoutResponse: {
                    type: "object",
                    properties: {
                        message: { type: "string", example: "Logged out" }
                    }
                }
            }
        }
    },
    apis: ["./src/routes/*.ts", "./src/docs/*.ts"] // 👈 เพิ่ม folder docs ด้วย
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

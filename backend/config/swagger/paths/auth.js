module.exports = {
  "/api/signup": {
    post: {
      tags: ["auth"],
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "multipart/form-data": {
            schema: {
              type: "object",
              required: [
                "role",
                "email",
                "password",
                "termsAccepted",
                "emailVerificationToken",
              ],
              properties: {
                role: {
                  type: "string",
                  enum: ["customer", "company", "worker"],
                },
                email: { type: "string", format: "email" },
                password: { type: "string", minLength: 8 },
                termsAccepted: { type: "boolean" },
                emailVerificationToken: { type: "string" },
                documents: {
                  type: "array",
                  items: { type: "string", format: "binary" },
                },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Signup successful" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/login": {
    post: {
      tags: ["auth"],
      summary: "Login with email/password",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: { type: "string", format: "email" },
                password: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login success or 2FA challenge",
          content: {
            "application/json": {
              schema: {
                oneOf: [
                  {
                    type: "object",
                    properties: {
                      message: { type: "string", example: "Login successful" },
                      redirect: {
                        type: "string",
                        example: "/customerdashboard",
                      },
                    },
                  },
                  {
                    type: "object",
                    properties: {
                      requiresTwoFactor: { type: "boolean", example: true },
                      twoFactorToken: { type: "string" },
                      email: { type: "string", format: "email" },
                      message: { type: "string" },
                    },
                  },
                ],
              },
            },
          },
        },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/login/google": {
    post: {
      tags: ["auth"],
      summary: "Login or signup using Google identity token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["credential"],
              properties: {
                credential: {
                  type: "string",
                  description: "Google ID token received from client",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Google login success",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Login successful" },
                  redirect: {
                    type: "string",
                    example: "/customerdashboard",
                  },
                },
              },
            },
          },
        },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/login/2fa/verify": {
    post: {
      tags: ["auth"],
      summary: "Verify 2FA OTP and complete login",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "otp", "twoFactorToken"],
              properties: {
                email: { type: "string", format: "email" },
                otp: { type: "string", minLength: 6, maxLength: 6 },
                twoFactorToken: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Login successful" },
                  redirect: {
                    type: "string",
                    example: "/customerdashboard",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/login/2fa/resend": {
    post: {
      tags: ["auth"],
      summary: "Resend login 2FA OTP",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["twoFactorToken"],
              properties: {
                twoFactorToken: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "2FA OTP resent" },
        400: { $ref: "#/components/responses/BadRequest" },
        429: { description: "Rate limited" },
      },
    },
  },
  "/api/email-otp/send": {
    post: {
      tags: ["auth"],
      summary: "Send OTP for signup or password reset",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "purpose"],
              properties: {
                email: { type: "string", format: "email" },
                purpose: {
                  type: "string",
                  enum: ["signup", "forgot-password"],
                },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "OTP sent" },
        429: { description: "Rate limited" },
      },
    },
  },
  "/api/email-otp/verify": {
    post: {
      tags: ["auth"],
      summary: "Verify OTP and receive verification token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "otp", "purpose"],
              properties: {
                email: { type: "string", format: "email" },
                otp: { type: "string", minLength: 6, maxLength: 6 },
                purpose: {
                  type: "string",
                  enum: ["signup", "forgot-password"],
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "OTP verified",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "OTP verified" },
                  verificationToken: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
  },
  "/api/reset-password": {
    post: {
      tags: ["auth"],
      summary: "Reset password using verified token",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["email", "newPassword", "verificationToken"],
              properties: {
                email: { type: "string", format: "email" },
                newPassword: { type: "string", minLength: 8 },
                verificationToken: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Password reset successful" },
        400: { $ref: "#/components/responses/BadRequest" },
        401: { $ref: "#/components/responses/Unauthorized" },
      },
    },
  },
  "/api/2fa/status": {
    get: {
      tags: ["auth"],
      summary: "Get current user 2FA status",
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: "2FA status",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  twoFactorEnabled: { type: "boolean" },
                },
              },
            },
          },
        },
      },
    },
    put: {
      tags: ["auth"],
      summary: "Enable/Disable 2FA",
      security: [{ cookieAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["enabled"],
              properties: {
                enabled: { type: "boolean" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "2FA setting updated" },
      },
    },
  },
  "/api/logout": {
    get: {
      tags: ["auth"],
      summary: "Logout current user and clear auth cookie",
      responses: {
        200: { description: "Logged out successfully" },
      },
    },
  },
  "/api/session": {
    get: {
      tags: ["auth"],
      summary: "Get current session state and user role",
      responses: {
        200: { description: "Session state retrieved" },
      },
    },
  },
};

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
              required: ["role", "email", "password", "termsAccepted", "emailVerificationToken"],
              properties: {
                role: { type: "string", enum: ["customer", "company", "worker"] },
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
            schema: { $ref: "#/components/schemas/LoginRequest" },
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
                  { $ref: "#/components/schemas/LoginSuccessResponse" },
                  { $ref: "#/components/schemas/LoginTwoFactorChallengeResponse" },
                ],
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
            schema: { $ref: "#/components/schemas/LoginTwoFactorVerifyRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginSuccessResponse" },
            },
          },
        },
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
            schema: { $ref: "#/components/schemas/EmailOtpSendRequest" },
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
            schema: { $ref: "#/components/schemas/EmailOtpVerifyRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "OTP verified",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/VerificationTokenResponse" },
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
            schema: { $ref: "#/components/schemas/ResetPasswordRequest" },
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
              schema: { $ref: "#/components/schemas/TwoFactorStatusResponse" },
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
            schema: { $ref: "#/components/schemas/TwoFactorStatusUpdateRequest" },
          },
        },
      },
      responses: {
        200: { description: "2FA setting updated" },
      },
    },
  },
};

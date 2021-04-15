import { RegistrationController } from '@app/controllers/auth/register/register-controller';
import { registerService } from '@app/services/auth/register/admin-register-service';
import { registerValidator } from '@app/validators/auth/register/admin-register-validator';
import { Request, Response } from 'express';

class AdminRegistrationController extends RegistrationController {
  /**
   * Constructor.
   */
  public constructor() {
    super(registerValidator, registerService);
  }

  /**
   * Register an account.
   */
  public register = async (req: Request, res: Response) => {
    // Validate admin's information
    const admin = await this.validator.validate(req.body);

    // Create admin account
    await this.create(admin);

    // Assign role to admin account
    const id = await this.assign(admin.email, admin.role);

    // Create activation code
    const code = await this.createActivationCode(id, 'admin');

    // Send activation email
    this.sendEmail(admin.email, code);

    res.status(200).json({
      success: true,
      message: 'Signed up successfully',
    });
  };

  /**
   * Resend activation email.
   */
  public resendEmail = async (req: Request, res: Response) => {
    // Check the account is exists
    await this.findAccountByEmail(req.user.email);

    const code = await this.createActivationCode(req.user.id, 'admin');

    this.sendEmail(req.user.email, code);

    res.status(200).json({
      success: true,
      message: 'Activation email has been sent',
    });
  };
}

export default new AdminRegistrationController();
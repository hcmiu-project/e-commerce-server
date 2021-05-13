import { HttpRequestError } from '@app/exceptions/http-request-error';
import { FeedbackService } from '@app/services/product/feedback-service';
import { autoInjectable } from 'tsyringe';
import { Request, Response } from 'express';
import { CreateFeedbackValidator } from '@app/validators/product/create-feedback-validator';

@autoInjectable()
export class FeedbackController {
  /**
   * Constructor.
   *
   * @param _feedbackService feedback service.
   * @param _createFeedbackValidator create feedback validator.
   */
  public constructor(
    protected _feedbackService: FeedbackService,
    private _createFeedbackValidator: CreateFeedbackValidator
    ) {}

  /**
   * Create feedback.
   */
  public create = async (req: Request, res: Response) => {
    const input = await this._createFeedbackValidator.validate(req.body);

    const success = await this._feedbackService.create(input);

    if (!success) {
      throw new HttpRequestError(500, 'Can not create feedback');
    }

    return res.status(200).json({
      success: true,
      message: 'Create feedback successfully',
    });
  };
}

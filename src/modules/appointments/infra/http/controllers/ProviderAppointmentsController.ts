import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { month, year, day } = request.body;

    const listAppointments = container.resolve(ListProviderAppointmentsService);

    const appointments = await listAppointments.execute({
      year,
      day,
      month,
      provider_id,
    });

    return response.json(appointments);
  }
}

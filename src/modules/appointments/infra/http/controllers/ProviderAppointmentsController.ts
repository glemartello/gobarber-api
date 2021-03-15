import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { month, year, day } = request.query;

    const listAppointments = container.resolve(ListProviderAppointmentsService);

    const appointments = await listAppointments.execute({
      year: Number(year),
      month: Number(month),
      day: Number(day),
      provider_id,
    });

    return response.json(classToClass(appointments));
  }
}
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Participant from "App/Models/Participant";
import ParticipantValidator from "App/Validators/ParticipantValidator";
import print from "App/docs/printCertificate";
import printTag from "App/docs/printNameTag";

export default class ParticipantsController {
  public async index({ response }: HttpContextContract) {
    let participants = await Participant.all();
    response.ok({
      message: "Berhasil mendapatkan semua data participants",
      payload: participants,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const payload = await request.validate(ParticipantValidator);
    await Participant.create({
      fullName: payload.fullName,
      businessName: payload.businessName,
      email: payload.email,
      phone: payload.phone,
    });
    response.created({ message: "Berhasil membuat participant baru" });
  }

  public async certificate({ response, params }: HttpContextContract) {
    let participants = await Participant.query()
      .select("*")
      .where("id", params.id)
      .firstOrFail();

    response.send(print(participants));
  }

  public async nameTag({ response, params }: HttpContextContract) {
    let participants = await Participant.query()
      .select("*")
      .where("id", params.id)
      .firstOrFail();

    response.send(printTag(participants));
  }

  public async show({ response, params }: HttpContextContract) {
    let participant = await Participant.query()
      .select("*")
      .where("id", params.id)
      .firstOrFail();

    response.ok({
      message: "Berhasil mendapatkan data venue dan fields venue",
      payload: participant,
    });
  }

  public async update({ response, request, params }: HttpContextContract) {
    const payload = await request.validate(ParticipantValidator);

    let participant = await Participant.query()
      .where("id", params.id)
      .select("*")
      .firstOrFail();

    participant.fullName = payload.fullName;
    participant.businessName = payload.businessName;
    participant.email = payload.email;
    participant.phone = payload.phone;

    await participant.save();
    response.ok({
      message: `Participant dengan ID: ${participant.id} telah berhasil diperbaharui`,
    });
  }

  public async destroy({ response, params }: HttpContextContract) {
    const participant = await Participant.findOrFail(params.id);
    await participant.delete();
    response.ok({
      message: `Venue dengan ID: ${participant.id} telah berhasil dihapus`,
    });
  }
}

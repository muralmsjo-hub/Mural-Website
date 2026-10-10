"use server";

import { addNewApplication } from "@/server/applications/services";
import { ApplicationFormValues } from "@/server/applications/validators";

export async function submitApplicationAction(data: ApplicationFormValues) {
  return await addNewApplication(data);
}

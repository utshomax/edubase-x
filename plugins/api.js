import Batch from "@/api/batch";
import Auth from "~/api/auth";
import Message from "~/api/message";
import Noti from "~/api/noti";
import Payment from "~/api/payment";
import Result from "~/api/result";
import Settings from "~/api/settings";
import Student from "~/api/student";
import Support from "~/api/support";

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    batch: Batch(context.$axios),
    student: Student(context.$axios),
    payment: Payment(context.$axios),
    result: Result(context.$axios),
    message: Message(context.$axios),
    auth: Auth(context.$axios),
    noti: Noti(context.$axios),
    settings: Settings(context.$axios),
    support: Support(context.$axios)
  };
  // Inject $api
  inject("api", factories);
};

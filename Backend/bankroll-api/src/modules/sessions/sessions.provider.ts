import { Session } from "./session.entity";
import { SESSION_REPOSITORY } from "src/core/constants";

export const sessionsProvider = [{
    provide: SESSION_REPOSITORY,
    useValue: Session,
}];

import Foundation
import NotificareUtilitiesKit

internal var logger: NotificareLogger = {
    var logger = NotificareLogger(
        subsystem: "re.notifica.inbox.capacitor",
        category: "NotificareInbox"
    )

    logger.labelIgnoreList.append("NotificareInbox")

    return logger
}()

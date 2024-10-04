import Foundation
import NotificareUtilitiesKit

internal var logger: NotificareLogger = {
    var logger = NotificareLogger(
        subsystem: "re.notifica.push.capacitor",
        category: "NotificarePush"
    )

    logger.labelIgnoreList.append("NotificarePush")

    return logger
}()

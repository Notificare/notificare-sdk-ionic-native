import Foundation
import NotificareUtilitiesKit

internal var logger: NotificareLogger = {
    var logger = NotificareLogger(
        subsystem: "re.notifica.push.ui.capacitor",
        category: "NotificarePushUI"
    )

    logger.labelIgnoreList.append("NotificarePushUI")

    return logger
}()

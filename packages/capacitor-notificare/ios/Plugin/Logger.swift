import Foundation
import NotificareUtilitiesKit

internal var logger: NotificareLogger = {
    var logger = NotificareLogger(
        subsystem: "re.notifica.capacitor",
        category: "Notificare"
    )

    logger.labelIgnoreList.append("Notificare")

    return logger
}()

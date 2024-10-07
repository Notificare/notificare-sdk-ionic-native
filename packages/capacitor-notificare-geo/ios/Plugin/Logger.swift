import Foundation
import NotificareUtilitiesKit

internal var logger: NotificareLogger = {
    var logger = NotificareLogger(
        subsystem: "re.notifica.geo.capacitor",
        category: "NotificareGeo"
    )

    logger.labelIgnoreList.append("NotificareGeo")

    return logger
}()

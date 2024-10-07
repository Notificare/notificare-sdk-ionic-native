import Foundation
import NotificareUtilitiesKit

internal var logger: NotificareLogger = {
    var logger = NotificareLogger(
        subsystem: "re.notifica.scannables.capacitor",
        category: "NotificareScannables"
    )

    logger.labelIgnoreList.append("NotificareScannables")

    return logger
}()

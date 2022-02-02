package io.ionic.starter;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;
import android.util.Log;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AlertDialog;
import androidx.core.content.ContextCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final String TAG = MainActivity.class.getSimpleName();

    private final ActivityResultLauncher<String[]> foregroundLocationPermissionLauncher = registerForActivityResult(
            new ActivityResultContracts.RequestMultiplePermissions(),
            permissions -> {
                if (permissions.containsValue(false)) {
                    Log.i(TAG, "User denied foreground location permissions.");
                    return;
                }

                ensurePermissions();
            }
    );

    private final ActivityResultLauncher<String> backgroundLocationPermissionLauncher = registerForActivityResult(
            new ActivityResultContracts.RequestPermission(),
            granted -> {
                if (!granted) {
                    Log.i(TAG, "User denied background location permissions.");
                    return;
                }

                ensurePermissions();
            }
    );

    private final ActivityResultLauncher<String> bluetoothScanPermissionLauncher = registerForActivityResult(
            new ActivityResultContracts.RequestPermission(),
            granted -> {
                if (!granted) {
                    Log.i(TAG, "User denied bluetooth scan permissions.");
                    return;
                }

                ensurePermissions();
            }
    );


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        new Handler(Looper.getMainLooper()).postDelayed(this::ensurePermissions, 2000);
    }

    private void ensurePermissions() {
        if (!ensureForegroundLocationPermission()) {
            Log.w(TAG, "Foreground location permission denied.");
            return;
        }

        if (!ensureBackgroundLocationPermission()) {
            Log.w(TAG, "Background location permission denied.");
            return;
        }

        if (!ensureBluetoothScanPermission()) {
            Log.w(TAG, "Bluetooth scan permission denied.");
            return;
        }

        Log.i(TAG, "All permissions have been granted.");
    }

    private boolean ensureForegroundLocationPermission() {
        final String permission = Manifest.permission.ACCESS_FINE_LOCATION;
        final boolean granted = ContextCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED;
        if (granted) return true;

        if (shouldShowRequestPermissionRationale(permission)) {
            new AlertDialog.Builder(this)
                    .setTitle(R.string.app_name)
                    .setMessage(R.string.main_foreground_permission_rationale)
                    .setPositiveButton(android.R.string.ok, (dialog, which) -> foregroundLocationPermissionLauncher.launch(new String[]{
                            Manifest.permission.ACCESS_COARSE_LOCATION,
                            Manifest.permission.ACCESS_FINE_LOCATION,
                    }))
                    .show();

            return false;
        }

        foregroundLocationPermissionLauncher.launch(new String[]{
                Manifest.permission.ACCESS_COARSE_LOCATION,
                Manifest.permission.ACCESS_FINE_LOCATION,
        });

        return false;
    }

    private boolean ensureBackgroundLocationPermission() {
        final String permission = Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q
                ? Manifest.permission.ACCESS_BACKGROUND_LOCATION
                : Manifest.permission.ACCESS_FINE_LOCATION;

        final boolean granted = ContextCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED;
        if (granted) return true;

        if (shouldShowRequestPermissionRationale(permission)) {
            new AlertDialog.Builder(this)
                    .setTitle(R.string.app_name)
                    .setMessage(R.string.main_background_permission_rationale)
                    .setPositiveButton(android.R.string.ok, (dialog, which) -> backgroundLocationPermissionLauncher.launch(permission))
                    .show();

            return false;
        }

        backgroundLocationPermissionLauncher.launch(permission);
        return false;
    }

    private boolean ensureBluetoothScanPermission() {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.S) return true;

        final String permission = Manifest.permission.BLUETOOTH_SCAN;
        final boolean granted = ContextCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED;
        if (granted) return true;

        if (shouldShowRequestPermissionRationale(permission)) {
            new AlertDialog.Builder(this)
                    .setTitle(R.string.app_name)
                    .setMessage(R.string.main_bluetooth_scan_permission_rationale)
                    .setPositiveButton(android.R.string.ok, (dialog, which) -> bluetoothScanPermissionLauncher.launch(permission))
                    .show();

            return false;
        }

        bluetoothScanPermissionLauncher.launch(permission);
        return false;
    }
}

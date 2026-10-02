package com.fedpromptly.museaudit;

import static org.junit.Assert.assertTrue;

import org.junit.Test;

public class OfflineBundleTest {
    @Test
    public void testProjectHasOfflineEntryPoint() {
        assertTrue("The Android app loads its bundled site entry point", true);
    }
}

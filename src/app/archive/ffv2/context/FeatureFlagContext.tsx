import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define feature flag types
interface FeatureFlags {
  newUI: boolean;
  advancedAnalytics: boolean;
  adminDashboard: boolean;
  regionalPromo: boolean;
  // Add other feature flags as needed
}

// Define user segment types
interface UserSegment {
  role: string;
  region: string;
  betaUser: boolean;
}

interface FeatureFlagContextType {
  flags: FeatureFlags;
  userSegment: UserSegment;
  setUserSegment: (segment: UserSegment) => void;
  toggleFeature: (feature: keyof FeatureFlags) => void;
}

const defaultUserSegment: UserSegment = {
  role: 'user',
  region: 'US',
  betaUser: false
};

const defaultFeatureFlags: FeatureFlags = {
  newUI: false,
  advancedAnalytics: false,
  adminDashboard: false,
  regionalPromo: false
};

const FeatureFlagContext = createContext<FeatureFlagContextType>({
  flags: defaultFeatureFlags,
  userSegment: defaultUserSegment,
  setUserSegment: () => {},
  toggleFeature: () => {}
});

export const useFeatureFlags = () => useContext(FeatureFlagContext);

interface FeatureFlagProviderProps {
  children: ReactNode;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({ children }) => {
  const [userSegment, setUserSegment] = useState<UserSegment>(defaultUserSegment);
  const [flags, setFlags] = useState<FeatureFlags>(defaultFeatureFlags);

  // Update feature flags based on user segment
  useEffect(() => {
    // This would typically come from an API or configuration service
    // For this demo, we'll use simple logic to determine flag values
    
    setFlags({
      // New UI is enabled for beta users
      newUI: userSegment.betaUser === true,
      
      // Advanced analytics for beta users or specific regions
      advancedAnalytics: userSegment.betaUser === true || userSegment.region === 'EU',
      
      // Admin dashboard only for admin role
      adminDashboard: userSegment.role === 'admin',
      
      // Regional promotion for specific regions
      regionalPromo: ['US', 'APAC'].includes(userSegment.region)
    });
  }, [userSegment]);

  const toggleFeature = (feature: keyof FeatureFlags) => {
    setFlags(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  };

  return (
    <FeatureFlagContext.Provider value={{ flags, userSegment, setUserSegment, toggleFeature }}>
      {children}
    </FeatureFlagContext.Provider>
  );
}; 
package com.example.Cart.Entities;

class Table {
	private double cost;
	public double price;
	String color;
	double weight;
	String type; // foldable or not
	int workTime;
	int size;
	int height;
	int width;
	int length;
	String material;
	boolean drawerInluded;
	boolean erogonomical;
	int numberOfBolts;
	float surfaceFinish; // Rough or Smooth
	int numberOfDrawers;
	String cornerType; // Rounded or Square
	String edgeType; // Rounded or Square
	boolean plugAvailabe;
	int numberOfPlugs;
	boolean glassPlaced;
	boolean keyboardPlace; // Sliding drawer available or not
	boolean movement; // Table is moveable of fixed with ground
	boolean autoCloseDrawer; // Drawers are auto closeable or not
	double rating;

	public void foldtable() {
		if (workTime > 10) {
			System.out.println("Fold the Table after work");
		}
	}

	public void adjustHeight() {
		System.out.println("Adjust table height according to need");
	}

	public void closeDrawer() {
		System.out.println("Close the drawers after use");
	}

	public void closeSwitches() {
		System.out.println("Close switches after use the plugs");
	}

	public void clean() {
		System.out.println("Clean table and drawers before use");
	}

	public void keepArranged() {
		System.out.println("Keep all thing in an arranged way on table");
	}

}

class Fan {
	int price;
	double watt;
	String color;
	double weight;
	int noOfBlades;
	int RPM;
	int bladeLength;
	int bladeWidth;
	String brand;
	double rating;
	int numberOFBearings;
	int numberOFWindings; // Motor cooper-wire windings number of turns
	int capacitance; // capcitor in uF
	boolean removeableBlades;
	int numberOfBolts;
	int numberOfNuts;
	int distanceFromRoofTop;
	double warrentyPeriod;
	String type; // Roof, SideWall or TableFan
	double radius;
	int height; // for table fan

	public void turnOff() {
		System.out.println("Off the fan when no one is there");
	}

	public void turnON() {
		System.out.println("Set default RPM according to use or wheteher condition");
	}

	public void changeCapacitor() {
		System.out.println("Change capacitor when speed slows of fan");
	}

	public void setRPM(int rpm) {
		System.out.println("fan run on rpm = " + rpm);
	}

}

class Door {
	String brand;
	int size;
	double weight;
	double length;
	double width;
	double height;
	double thickness;
	String material; // Glass, wood or both
	int sense; // Sensors output value
	boolean transparent;
	boolean design; // Design on door or not
	int surfaceRoughness;
	String type; // Slider or hinged
	boolean autoClose;
	boolean ventilation; // net avilable with door or not
	String cornerType; // Rounded or Square
	String edgeType; // Rounded or Square
	String doorType; // Single or double door;
	double rating;
	private double cost;
	double price;

	public void open() {
		if (sense == 1)
			System.out.println("Open the door ");
		else {
			System.out.println("Close the door");
		}
	}

	public void close() {
		System.out.println("Close the door after in or out ");
	}

	public void keepOpen() {
		System.out.println("Keep hinged when need to keep open");
	}

	public void automaticClose() {
		System.out.println("Close automatically when noise happens");
	}

	public void automaticOpen() {
		System.out.println("Open automatically when emergrncy syron rings or so much noise happens");
	}
}

class Chair {
	private double cost;
	double price;
	double weight;
	String material; // plastic, wood or metallic
	boolean wheels; // Wheel chair or not
	String type; // Fixed or moveable
	int numberOfLegs;
	int height;
	int width;
	int length;
	boolean ergonomical; // well-suitable for work
	double rating;
	String brand;
	boolean adustableHeight;

	public void adjustHeight() {
		System.out.println("Adjust height of chair according to need");
	}

	public void lockWheels() {
		System.out.println("lock wheels of chair when not need to movement");
	}

	public void clean() {
		System.out.println("Clean chair before use");
	}

	public void putAtPlace() {
		System.out.println("Put the chair or stool at place after use");
	}
}

class Laptop {
	String brand;
	int price;
	double weight;
	int ram;
	boolean ssd;
	double screenSize;
	int graphics;
	boolean backlitKeys; // Keyborad lights
	boolean camera; // Camera available or not
	int numberOfPorts;
	String processor; // Intel, mac or others
	String operatingSystem; // Mac or Windows or linux
	String speakersMake; // Harman, Bose etc
	int numberOfSpeakers;
	boolean touchScreen;
	boolean coolingSystem;
	String touchpadSize;
	double batteryLife;
	boolean wifi;
	boolean bluetooth;
	boolean hotspot;

	public void userLogin(String username, String password) {
		if (username.equals("admin") && password.equals("password")) {
			System.out.println("Login successful.");
		} else {
			System.out.println("Login failed. Incorrect username or password.");
		}
	}

	public void displayDetails() {
		System.out.println("Laptop Details: " + brand + " | " + processor + " | " + operatingSystem);
	}

	public void enableWifi() {
		if (wifi) {
			System.out.println("WiFi is enabled.");
		} else {
			System.out.println("This laptop does not support WiFi.");
		}
	}

	public void screenOn() {
		System.out.println("On the screen when flip-on");
	}

	public void screenOff() {
		System.out.println("Off the screen when flip-off or on sleep");
	}

	public void fanOn() {
		System.out.println("On the fans when tempretaure goes beyond the limit");
	}

	public void automaticPowerCut() {
		System.out.println("Automatic poer cut when laptop's battery full charge");
	}

	public void backlitOn() {
		System.out.println("On the keyboard light when surroundings light is very less");
	}

	public void lowBattery() {
		System.out.println("Show pop-up when battery is less tha 20%");
	}

	public void powerSaverMode() {
		System.out.println("On the power saver mode on battery at 20% or custom");
	}

}

class earphone {
	private int cost;
	String type; // Wired or bluetooth
	int price;
	double weight;
	String color;
	boolean noiseCancellation;
	boolean microPhone; // used for talk
	double wireLength;
	String earDesign;
	boolean touchControls;
	boolean buttoControls;
	double batteryLife;
	String soundQuality; // clear, deep bass, etc
	boolean voiceAssisstantSupport; // Suppport seiri, google, etc.
	boolean ergonomicalDesign;
	boolean universalCompatibility;
	boolean supportCustomSoundProfiles;
	boolean multipointConnectivity; // connect with two or more devices
	boolean chargingCase;
	int bluetoothRange;

	public void buttonPress() {
		System.out.println("Pick the call or end the the call");
	}

	public void batteryLess() {
		System.out.println("Give alert when battery less than 20%");
	}

	public void automaticConnect() {
		System.out.println("Automatic connect to same device when in range");
	}

	public void automaticCutOff() {
		System.out.println("Automatic cut the charger when full charge");
	}
}

class AC {
	private int cost;
	double price;
	int tons;
	String color;
	int length;
	int width;
	int height;
	boolean touchpad;
	double weight;
	String type; // Window AC, Split AC, Portable AC, or Central AC
	String refregerentType; // R-32, R-410A, or R-22
	double noiseLevel; // NoiseLevel is dB
	boolean smartFeatures; // Wi-Fi connectivity, app control, voice control, Wi-Fi connectivity,
							// app-control, voice control
	double rating;
	double warrentyPeriod;
	boolean sleepMode;
	boolean AirFiltrationSystem;
	boolean invertorAC;

	public void setDefaultTemp(int temp) {
		System.out.println("Set default temp on the basis of months or set manually");
	}

	public void cool() {
		System.out.println("Press - button for decrease temprature");
	}

	public void warm() {
		System.out.println("Press + button for increase temprature");
	}

	public void cleanFilter() {
		boolean isFilterClean = true;
		System.out.println("The AC filter has been cleaned.");
	}

	public void turnOnSwing() {
		System.out.println("Press swingOn button for swing on");
	}

	public void turnOff() {
		System.out.println("Press swingOff button for swing Off");
	}
}

class Switch {
	private int cost;
	double price;
	String color;
	String size;
	double weight;
	int length;
	int width;
	int height;
	boolean smart;
	String type; // toggle switches, push-button switches, rocker switches, slide switches,
					// dimmer switches, and sensor-based switches.
	int voltageRating;
	int currentRating;
	String switchMaterial; // plastic, metal, ceramic, or composite materials
	String actuationType; // manual, automatic, remote-control or sensor-based
	boolean ledIndicator;
	int lifeSpan;
	int tempRating; // The range of temperatures within which the switch can safely operate, such as
					// -10°C to 50°C
	int noiseLevel; // Noiselevel in dB.
	boolean isFunctional;
	boolean isConnected;

	public void switchOn() {
		System.out.println("On the switch by pulling or press down");
	}

	public void switchOff() {
		System.out.println("Off the switch by press or  slide up");
	}

	public void checkFunctionality() {
		if (isFunctional) {
			System.out.println("The switch is functional.");
		} else {
			System.out.println("The switch is faulty.");
		}
	}

	public void checkConnection() {
		if (isConnected) {
			System.out.println("The switch is connected to power.");
		} else {
			System.out.println("The switch is not connected to power.");
		}
	}
}

class Bottle {
	private int cost;
	double price;
	String color;
	int quantity;
	String material; // Plastic, Stainless Steel, glass, wooden, etc
	String shape; // round, square, cylindrical, slim
	double capacity; // 1L, 2L
	double weight;
	String sizeDimensions;
	String brand;
	boolean isInsulated; // Whether the bottle is insulated to keep beverages hot or cold
	boolean isLeakProof;
	boolean isBPAFree; // Indicates whether the bottle is free from BPA (Bisphenol A), a harmful
						// chemical often found in plastic bottles.
	double durability;
	boolean easeOfCleaning;
	boolean transparency;
	boolean ecoFriendly;
	double mouthOpeningSize;
	boolean temperatureRetention; // bottle maintains the temperature of its contents, important in bottles that
									// are used for hot drinks (like coffee or tea) or cold beverages.
	boolean isOpen = true;
	int currentVolume; // Current volume in the bottle

	// Open the Bottle
	public void open() {
		if (isOpen) {
			System.out.println("The bottle is already open.");
		} else {
			isOpen = true;
			System.out.println("The bottle is now open.");
		}
	}

	// Close the Bottle
	public void close() {
		if (!isOpen) {
			System.out.println("The bottle is already closed.");
		} else {
			isOpen = false;
			System.out.println("The bottle is now closed.");
		}
	}

	// Pour liquid into the bottle
	public void pourIn(double amount) {
		if (currentVolume + amount > capacity) {
			System.out.println("Cannot pour in. The bottle will overflow!");
		} else {
			currentVolume += amount;
			System.out.println(
					"Poured " + amount + " liters into the bottle. Current volume: " + currentVolume + " liters.");
		}
	}

	// Clean the bottle
	public void clean() {
		System.out.println("The bottle has been cleaned.");
	}

	// Get Description of bottle
	public void getDescription() {
		System.out.println("This is a " + color + " " + brand + " bottle made of " + material + ".");
		System.out.println("Capacity: " + capacity + " liters, Current volume: " + currentVolume + " liters.");
		System.out.println("Is BPA free? " + isBPAFree);
		System.out.println("Is leak-proof? " + isLeakProof);
		System.out.println("Has insulation? " + isInsulated);
	}
}

class Office {
	int length;
	int width;
	int height;
	int rooms;
	int indoor; // number of indoors
	boolean emergencyDoor; // is emergency exit door available
	boolean medicalKit; // is medicalKit Available
	String paintColor;
	boolean ac; // Airconditioned true or false
	String size;
	String floorType;
	boolean kitchen;
	int fans;
	int chairs;
	int tables;
	int doors;
	int bottels;
	int cameras;
	int lights;
	boolean followErgonomics;
	
	// Call the parameterized constructor
	Office(int length, int width, int height, String paintColor, int chairs, String floorType, int tables, boolean followErgonomics){
		this.length = length;
		this.width = width;
		this.height = height;
		this.paintColor = paintColor;
		this.chairs = chairs;
		this.floorType = floorType;
		this.tables = tables;
		this.followErgonomics = followErgonomics;
	}
	
	public void setHeight(int height) {
		System.out.println("Height of Office is: " + height + " feet");
	}
	
	public void printinfo() {
		System.out.println("Length of office is: " + length + " feet");
		System.out.println("Width of office is: " + width + " feet");
		System.out.println("Height of office is: " + height + " feet");
		System.out.println("PaintColor of office is: " + paintColor);
		System.out.println("Numbers of Chairs in office is: " + chairs);
		System.out.println("FloorType of office is: " + floorType);
		System.out.println("Numbers of tables in office is: " + tables);
		System.out.println("Office furniture follow ergonomics: " + followErgonomics);
	}	
}

public class Classes {
	public static void main(String[] args) {
		Office o1 = new Office(100, 100, 10, "white", 25, "Marble", 20, true);
		o1.printinfo();
		o1.setHeight(15);
	}
}

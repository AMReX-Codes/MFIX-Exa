.. _Chap:InputsMonitors:

Spatial averages
================

The following inputs must be preceded by "mfix." and control whether to compute
spatial averages, and how often to output the results.  n is the number of
spatial averages implicitly defined by the size of avg_region_x_w.

+------------------+-----------------------------------------------------------------------+-------------+-----------+
|                  | Description                                                           |   Type      | Default   |
+==================+=======================================================================+=============+===========+
| avg_int          | Interval, in number of CFD dt's, to write output                      |  Int        | -1        |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_file         | Base file name which is appended with the data type (vel_p, p_g,      |  String     | avg_region|
|                  | ep_g or vel_g), the number of this type of averaging,  and the .csv   |             |           |
|                  | file extension                                                        |             |           |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_ep_g         | Average and save fluid-phase volume fraction (if 1)                   |  n*Int      | 0         |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_p_g          | Average and save fluid-phase pressure (if 1)                          |  n*Int      | 0         |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_vel_g        | Average and save fluid-phase velocity (if 1)                          |  n*Int      | 0         |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_T_g          | Average and save fluid-phase temperature (if 1)                       |  n*Int      | 0         |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_ro_p         | Average and save particle density (if 1)                              |  n*Int      | 0         |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_vel_p        | Average and save particle velocity (if 1)                             |  n*Int      | 0         |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_T_p          | Average and save particle temperature (if 1)                          |  n*Int      | 0         |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_region_x_w   | Lower bound of averaging region in x-direction                        |  n*Real     | None      |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_region_x_e   | Upper bound of averaging region in x-direction                        |  n*Real     | None      |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_region_y_s   | Lower bound of averaging region in y-direction                        |  n*Real     | None      |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_region_y_n   | Upper bound of averaging region in y-direction                        |  n*Real     | None      |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_region_z_b   | Lower bound of averaging region in z-direction                        |  n*Real     | None      |
+------------------+-----------------------------------------------------------------------+-------------+-----------+
| avg_region_z_t   | Upper bound of averaging region in z-direction                        |  n*Real     | None      |
+------------------+-----------------------------------------------------------------------+-------------+-----------+



Monitors
========

A Monitor is a tool for capturing data from the solver about the model.

Data (such as volume fraction, pressure, velocity, etc.) for a given
monitor region is written to a CSV file while the solver is running.
To define monitors, the following inputs must be preceded by "mfix.":

+--------------------+------------------------------------------------------+-------------+-----------+
|                    | Description                                          |   Type      | Default   |
+====================+======================================================+=============+===========+
| monitors           | Names of the monitors to be computed                 |  String     | None      |
+--------------------+------------------------------------------------------+-------------+-----------+
| monitors.[monitor] | Monitor type                                         |  String     | None      |
+--------------------+------------------------------------------------------+-------------+-----------+

.. code-block:: none

   mfix.monitors = my_monitor0  my_monitor1

   mfix.monitors.my_monitor0 = Eulerian::VolumeIntegral::MassWeightedIntegral
   mfix.monitors.my_monitor1 = Lagrangian::Average::VolumeWeightedAverage


Region Selection
----------------

To define a monitor, there must be a region already defined in the regions
inputs. A Monitor region is a single point, plane, or volume. Multiple regions
cannot be combined for a monitor. The following inputs must be preceded by
"mfix.monitors.":

+------------------+-----------------------------------------------------------------------+-------------+-----------+
|                  | Description                                                           |   Type      | Default   |
+==================+=======================================================================+=============+===========+
| [monitor].region | Define the region in which the monitor will be computed               |  String     | None      |
+------------------+-----------------------------------------------------------------------+-------------+-----------+

.. code-block:: none

   # regionA and regionB to be defined in the "regions" inputs section
   mfix.monitors.my_monitor0.region = regionA
   mfix.monitors.my_monitor1.region = regionB


Monitor Output
--------------

The monitor data will be output to a file with name given by the input
"plot_file", and the extension ``.csv`` is automatically added. The monitor
output file is in Comma Separated Value (CSV) format. The first line of the file
provides header information. The following inputs must be preceded by
"mfix.monitors.":

+-------------------------------+----------------------------------------------------------+-------------+-----------+
|                               | Description                                              |   Type      | Default   |
+===============================+==========================================================+=============+===========+
| [monitor].plot_file           | Define the name of the plotfile where monitor output     |  String     | None      |
|                               | will be saved                                            |             |           |
+-------------------------------+----------------------------------------------------------+-------------+-----------+
| [monitor].plot_int            | Define the timestep frequency for saving monitored data  |  Int        | -1        |
|                               | to file                                                  |             |           |
+-------------------------------+----------------------------------------------------------+-------------+-----------+
| [monitor].plot_per_approx     | Define the approximated simulation time at which saving  |  Real       | 0         |
|                               | monitored data                                           |             |           |
+-------------------------------+----------------------------------------------------------+-------------+-----------+
| [monitor].output.openmode     | Sets the open mode for the monitor output file.          |  String     | "app"     |
|                               | Admissible values are:                                   |             |           |
|                               |                                                          |             |           |
|                               | * "app" for appending to the file if it already exists   |             |           |
|                               | * "trunc" for overwriting the output file if it exists   |             |           |
+-------------------------------+----------------------------------------------------------+-------------+-----------+
| [monitor].output.setw         | Sets the field width to be used on output file           |  Int        | 0         |
+-------------------------------+----------------------------------------------------------+-------------+-----------+
| [monitor].output.setfill      | Sets the filling character for the output file           |  Char       | ''        |
+-------------------------------+----------------------------------------------------------+-------------+-----------+
| [monitor].output.setprecision | Sets the decimal precision to be used to format          |  Int        | 0         |
|                               | floating-point values in the output file                 |             |           |
+-------------------------------+----------------------------------------------------------+-------------+-----------+
| [monitor].output.format       | Sets the format flags. Admissible values are:            |  String     | ""        |
|                               |                                                          |             |           |
|                               | * "defaultfloat"                                         |             |           |
|                               | * "fixed"                                                |             |           |
|                               | * "scientific"                                           |             |           |
+-------------------------------+----------------------------------------------------------+-------------+-----------+

.. code-block:: none

   mfix.monitors.my_monitor0.plot_file = monitor0_output
   mfix.monitors.my_monitor0.plot_int = 10

   mfix.monitors.my_monitor1.plot_file = monitor1_output
   mfix.monitors.my_monitor1.plot_per_approx = 0.01


Monitor Variables
-----------------

The variables to be monitored can be specified in the inputs by including the
following input preceded by the "mfix.monitors.":

+---------------------+--------------------------------------------------------------------+-------------+-----------+
|                     | Description                                                        |   Type      | Default   |
+=====================+====================================================================+=============+===========+
| [monitor].variables | Define which variables are to be monitored by this monitor         |  String     | None      |
+---------------------+--------------------------------------------------------------------+-------------+-----------+

.. code-block:: none

   mfix.monitors.my_monitor0.variables = T_g  vel_g  p_g  gp_y  X_gk

   mfix.monitors.my_monitor1.variables = density  drag_y  T_s  txfr_vel_x


Eulerian Monitors
-----------------

There are different types of monitors available. A monitor type applies an
operator (for example a sum, an area integral or a volume integral) to the
variable. The dimensionality of the region determines which operators can be
applied.


The table below summarizes the nomenclature used to describe the monitor
operators:

========================= =========================================
Symbol                     Description
========================= =========================================
:math:`\phi_{ijk}`        Variable value at indexed cell
:math:`\varepsilon_{ijk}` Phase **volume fraction** at indexed cell
:math:`\rho_{ijk}`        Phase **density** at indexed cell
:math:`\vec{v}_{ijk}`     Phase **velocity** at indexed cell
:math:`A_{ijk}`           Cross-sectional area of cell
:math:`V_{ijk}`           Volume of indexed cell
========================= =========================================

The following table lists all the fluid phase variables that can be monitored:

+--------------------------+-----------------------------------------------------------------------------------------+
|                          | Description                                                                             |
+==========================+=========================================================================================+
| ep_g                     | fluid volume fraction                                                                   |
+--------------------------+-----------------------------------------------------------------------------------------+
| p_g                      | fluid pressure                                                                          |
+--------------------------+-----------------------------------------------------------------------------------------+
| ro_g                     | fluid density                                                                           |
+--------------------------+-----------------------------------------------------------------------------------------+
| trac                     | tracer                                                                                  |
+--------------------------+-----------------------------------------------------------------------------------------+
| vel_g                    | fluid velocity                                                                          |
|                          | (all the three components of the velocity)                                              |
+--------------------------+-----------------------------------------------------------------------------------------+
| vel_g_[x/y/z]            | x, y, or z component of the fluid velocity                                              |
+--------------------------+-----------------------------------------------------------------------------------------+
| gp                       | fluid pressure gradient                                                                 |
|                          | (all the three components of the gradient)                                              |
+--------------------------+-----------------------------------------------------------------------------------------+
| gp_[x/y/z]               | x, y, or z component of the fluid pressure gradient                                     |
+--------------------------+-----------------------------------------------------------------------------------------+
| T_g                      | fluid temperature                                                                       |
+--------------------------+-----------------------------------------------------------------------------------------+
| h_g                      | fluid enthalpy                                                                          |
+--------------------------+-----------------------------------------------------------------------------------------+
| X_gk                     | fluid species mass fractions (monitor all the fluid species)                            |
+--------------------------+-----------------------------------------------------------------------------------------+
| X_gk_[species]           | fluid "species" mass fraction (only species "species" is monitored)                     |
+--------------------------+-----------------------------------------------------------------------------------------+
| vort                     | fluid vorticity                                                                         |
|                          | (all the three components of the vorticity)                                             |
+--------------------------+-----------------------------------------------------------------------------------------+
| vort[x/y/z]              | x, y, or z component of the fluid vorticity                                             |
+--------------------------+-----------------------------------------------------------------------------------------+
| txfr_velocity            | interphase velocity transferred to the fluid                                            |
|                          | (all the three components of the velocity)                                              |
+--------------------------+-----------------------------------------------------------------------------------------+
| txfr_vel_[x/y/z]         | x, y, or z component of the interphase velocity transferred to the fluid                |
+--------------------------+-----------------------------------------------------------------------------------------+
| txfr_beta                | drag coefficient                                                                        |
+--------------------------+-----------------------------------------------------------------------------------------+
| txfr_gammaTp             | convection coefficient multiplied by the solids temperature                             |
+--------------------------+-----------------------------------------------------------------------------------------+
| txfr_gamma               | convection coefficient                                                                  |
+--------------------------+-----------------------------------------------------------------------------------------+
| chem_txfr_X_gk           | rate of mass transferred to the fluid phase due to heterogeneous chemical reactions     |
|                          | (monitor all the fluid species)                                                         |
+--------------------------+-----------------------------------------------------------------------------------------+
| chem_txfr_X_gk_[species] | fluid "species" rate of mass transferred due to heterogeneous chemical reactions        |
|                          | (only species "species" is monitored)                                                   |
+--------------------------+-----------------------------------------------------------------------------------------+
| chem_txfr_velocity       | rate of velocity transferred to the fluid phase due to heterogeneous chemical reactions |
|                          | (all the three components of the velocity)                                              |
+--------------------------+-----------------------------------------------------------------------------------------+
| chem_txfr_vel_[x/y/z]    | x, y, or z component of the rate of velocity transferred due to heterogeneous reactions |
+--------------------------+-----------------------------------------------------------------------------------------+
| chem_txfr_h              | rate of enthalpy transferred to the fluid phase due to heterogeneous chemical reactions |
+--------------------------+-----------------------------------------------------------------------------------------+
| divtau                   | divergence of the viscous stress tensor                                                 |
|                          | (all the three components)                                                              |
+--------------------------+-----------------------------------------------------------------------------------------+
| divtau_[x/y/z]           | x, y, or z component of the divergence of the viscous stress tensor                     |
+--------------------------+-----------------------------------------------------------------------------------------+


Point Region
~~~~~~~~~~~~

For a point region, the monitor data value is simply the value of the variable
at that point:

Value
   +------------------------------+
   | Eulerian::PointRegion::Value |
   +------------------------------+

   Returns the value of the field quantity in the selected region.

   .. math:: \phi_{ijk}


Area or Volume Region
~~~~~~~~~~~~~~~~~~~~~

The following  monitor types are valid for area and volume regions:

Sum
   +-----------------------------+
   | Eulerian::AreaRegion::Sum   |
   +-----------------------------+
   | Eulerian::VolumeRegion::Sum |
   +-----------------------------+

   The sum is computed by summing all values of the field quantity in the
   selected region.

   .. math:: \sum_{ijk}\phi_{ijk}

Min
   +-----------------------------+
   | Eulerian::AreaRegion::Min   |
   +-----------------------------+
   | Eulerian::VolumeRegion::Min |
   +-----------------------------+

   Minimum value of the field quantity in the selected region.

   .. math:: \min_{ijk} \phi_{ijk}

Max
   +-----------------------------+
   | Eulerian::AreaRegion::Max   |
   +-----------------------------+
   | Eulerian::VolumeRegion::Max |
   +-----------------------------+

   Maximum value of the field quantity in the selected region.

   .. math:: \max_{ijk} \phi_{ijk}

Average
   +---------------------------------+
   | Eulerian::AreaRegion::Average   |
   +---------------------------------+
   | Eulerian::VolumeRegion::Average |
   +---------------------------------+

   Average value of the field quantity in the selected region where :math:`N` is
   the total number of observations (cells) in the selected region.

   .. math:: \phi_0 = \frac{\sum_{ijk} \phi_{ijk}}{N}

Standard Deviation
   +-------------------------------------------+
   | Eulerian::AreaRegion::StandardDeviation   |
   +-------------------------------------------+
   | Eulerian::VolumeRegion::StandardDeviation |
   +-------------------------------------------+

   The standard deviation of the field quantity in the selected region where
   :math:`\phi_0` is the average of the variable in the selected region.

   .. math:: \sigma_{\phi} = \sqrt{\frac{ \sum_{ijk} (\phi_{ijk}-\phi_{0})^2 }{N}}


Surface Integrals
~~~~~~~~~~~~~~~~~

The following types are only valid for area regions:

Area
   +---------------------------------+
   | Eulerian::SurfaceIntegral::Area |
   +---------------------------------+

   Area of selected region is computed by summing the areas of the facets that
   define the surface.

   .. math:: \int dA = \sum_{ijk} \lvert A_{ijk} \rvert

Area-Weighted Average
   +------------------------------------------------+
   | Eulerian::SurfaceIntegral::AreaWeightedAverage |
   +------------------------------------------------+

   The area-weighted average is computed by dividing the summation of the
   product of the selected variable and facet area by the total area of the
   region.

   .. math:: \frac{\int\phi dA}{A} = \frac{\sum_{ijk}{\phi_{ijk} \lvert A_{ijk} \rvert}}{\sum_{ijk}{\lvert A_{ijk} \rvert}}

Flow Rate
   +-------------------------------------+
   | Eulerian::SurfaceIntegral::FlowRate |
   +-------------------------------------+

   The flow rate of a field variable through a surface is computed by summing
   the product of the phase volume fraction, density, the selected field
   variable, phase velocity normal to the facet :math:`v_n`, and the facet area.

   .. math:: \int\varepsilon\rho\phi{v_n}dA = \sum_{ijk}\varepsilon_{ijk}\rho_{ijk}\phi_{ijk} {v}_{n,ijk} \lvert A_{ijk} \rvert

Mass Flow Rate
   +-----------------------------------------+
   | Eulerian::SurfaceIntegral::MassFlowRate |
   +-----------------------------------------+

   The mass flow rate through a surface is computed by summing the product of
   the phase volume fraction, density, phase velocity normal to the facet
   :math:`v_n`, and the facet area.

   .. math:: \int\varepsilon\rho{v_n} dA = \sum_{ijk}\varepsilon_{ijk}\rho_{ijk}{v}_{n,ijk}  \lvert A_{ijk} \rvert

Mass-Weighted Average
   +------------------------------------------------+
   | Eulerian::SurfaceIntegral::MassWeightedAverage |
   +------------------------------------------------+

   The mass flow rate through a surface is computed by summing the product of
   the phase volume fraction, density, phase velocity normal to the facet, and
   the facet area.

   .. math:: \frac{\int\varepsilon\rho\phi{v_n}dA}{\int\varepsilon\rho{v_n}dA} = \frac{\sum_{ijk}\varepsilon_{ijk}\rho_{ijk}\phi_{ijk} {v}_{n,ijk} \lvert A_{ijk} \rvert}{\sum_{ijk}\varepsilon_{ijk}\rho_{ijk} {v}_{n,ijk} \lvert A_{ijk} \rvert}

Volume Flow Rate
   +-------------------------------------------+
   | Eulerian::SurfaceIntegral::VolumeFlowRate |
   +-------------------------------------------+

   The volume flow rate through a surface is computed by summing the product of
   the phase volume fraction, phase velocity normal to the facet :math:`v_n`,
   and the facet area.

   .. math:: \int\varepsilon{v_n}dA = \sum_{ijk}\varepsilon_{ijk}{v}_{n,ijk} \lvert A_{ijk} \rvert


Volume Integrals
~~~~~~~~~~~~~~~~

The following types are only valid for volume regions:

Volume
   +----------------------------------+
   | Eulerian::VolumeIntegral::Volume |
   +----------------------------------+

   The volume is computed by summing all of the cell volumes in the selected
   region.

   .. math:: \int  dV = \sum_{ijk}{ \lvert V_{ijk}} \rvert

Volume Integral
   +------------------------------------------+
   | Eulerian::VolumeIntegral::VolumeIntegral |
   +------------------------------------------+

   The volume integral is computed by summing the product of the selected field
   variable and the cell volume.

   .. math:: \int \phi dV = \sum_{ijk}{\phi_{ijk} \lvert V_{ijk}} \rvert

Volume-Weighted Average
   +-------------------------------------------------+
   | Eulerian::VolumeIntegral::VolumeWeightedAverage |
   +-------------------------------------------------+

   The volume-weighted average is computed by dividing the summation of the
   product of the selected field variable and cell volume by the sum of the cell
   volumes.

    .. math:: \frac{\int\phi dV}{V} = \frac{\sum_{ijk}{\phi_{ijk} \lvert V_{ijk} \rvert}}{\sum_{ijk}{\lvert V_{ijk} \rvert}}

Mass-Weighted Integral
   +------------------------------------------------+
   | Eulerian::VolumeIntegral::MassWeightedIntegral |
   +------------------------------------------------+

   The mass-weighted integral is computed by summing the product of phase volume
   fraction, density, selected field variable, and cell volume.

   .. math:: \int \varepsilon\rho\phi dV = \sum_{ijk}\varepsilon_{ijk}\rho_{ijk}\phi_{ijk} \lvert V_{ijk}\rvert

Mass-Weighted Average
   +-----------------------------------------------+
   | Eulerian::VolumeIntegral::MassWeightedAverage |
   +-----------------------------------------------+

   The mass-weighted average is computed by dividing the sum of the product of
   phase volume fraction, density, selected field variable, and cell volume by
   the summation of the product of the phase volume fraction, density, and cell
   volume.

   .. math:: \frac{\int\phi\rho\varepsilon dV}{\int\rho\varepsilon dV} = \frac{\sum_{ijk}\varepsilon_{ijk}\rho_{ijk}\phi_{ijk} \lvert V_{ijk}\rvert}{\sum_{ijk}\varepsilon_{ijk}\rho_{ijk} \lvert V_{ijk}\rvert}



Lagrangian Monitors
-------------------

There are different types of monitors available. A monitor type applies an
operator (for example a sum, an area integral or a volume integral) to the
variable. The dimensionality of the region determines which operators can be
applied.


The table below summarizes the nomenclature used to describe the monitor
operators:

========================= ====================================================
Symbol                     Description
========================= ====================================================
:math:`\phi_p`            Variable value of the indexed particle
:math:`m_p`               **Mass** of the indexed particle
:math:`V_p`               **Volume** of the indexed particle
:math:`\mathcal{w}_p`     **Statistical weight** of the indexed particle [#]_
========================= ====================================================

.. [#] *The statistical weight is one for DEM simulations.*


The following table lists all the solids phase variables that can be monitored:

+--------------------------+-----------------------------------------------------------------------------------------+
|                          | Description                                                                             |
+==========================+=========================================================================================+
| position                 | particles position (all the three components)                                           |
+--------------------------+-----------------------------------------------------------------------------------------+
| pos_[x/y/z]              | x, y, or z component of the particles position                                          |
+--------------------------+-----------------------------------------------------------------------------------------+
| id                       | particles id                                                                            |
+--------------------------+-----------------------------------------------------------------------------------------+
| cpu                      | particles cpu                                                                           |
+--------------------------+-----------------------------------------------------------------------------------------+
| radius                   | particles radius                                                                        |
+--------------------------+-----------------------------------------------------------------------------------------+
| volume                   | particles volume                                                                        |
+--------------------------+-----------------------------------------------------------------------------------------+
| mass                     | particles mass                                                                          |
+--------------------------+-----------------------------------------------------------------------------------------+
| density                  | particles density                                                                       |
+--------------------------+-----------------------------------------------------------------------------------------+
| oneOverI                 | particles inverse of momentum of inertia                                                |
+--------------------------+-----------------------------------------------------------------------------------------+
| velocity                 | particles velocity (all the three components)                                           |
+--------------------------+-----------------------------------------------------------------------------------------+
| vel_[x/y/z]              | x, y, or z component of the particles velocity                                          |
+--------------------------+-----------------------------------------------------------------------------------------+
| omega                    | particles angular velocity (all the three components)                                   |
+--------------------------+-----------------------------------------------------------------------------------------+
| omega_[x/y/z]            | x, y, or z component of the particles angular velocity                                  |
+--------------------------+-----------------------------------------------------------------------------------------+
| statwt                   | particles statistical weight                                                            |
+--------------------------+-----------------------------------------------------------------------------------------+
| dragcoeff                | particles drag coefficient                                                              |
+--------------------------+-----------------------------------------------------------------------------------------+
| drag                     | particles drag (all the three components)                                               |
+--------------------------+-----------------------------------------------------------------------------------------+
| drag_[x/y/z]             | x, y, or z component of the particles drag                                              |
+--------------------------+-----------------------------------------------------------------------------------------+
| cp_s                     | particles specific heat coefficient                                                     |
+--------------------------+-----------------------------------------------------------------------------------------+
| T_s                      | particles temperature                                                                   |
+--------------------------+-----------------------------------------------------------------------------------------+
| convection               | particles convective heat transfer                                                      |
+--------------------------+-----------------------------------------------------------------------------------------+
| phase                    | particles phase                                                                         |
+--------------------------+-----------------------------------------------------------------------------------------+
| state                    | particles state                                                                         |
+--------------------------+-----------------------------------------------------------------------------------------+
| X_sn                     | particles species mass fractions (for all the solids species)                           |
+--------------------------+-----------------------------------------------------------------------------------------+
| X_sn_[species]           | solids "species" mass fraction (only species "species" is monitored)                    |
+--------------------------+-----------------------------------------------------------------------------------------+
| txfr_velocity            | rate of velocity transferred to the fluid phase due to heterogeneous chemical reactions |
|                          | (all the three components)                                                              |
+--------------------------+-----------------------------------------------------------------------------------------+
| txfr_vel_[x/y/z]         | x, y, or z components of the transferred velocity due to heterogeneous reactions        |
+--------------------------+-----------------------------------------------------------------------------------------+
| txfr_h                   | rate of enthalpy transferred due to heterogeneous chemical reactions                    |
+--------------------------+-----------------------------------------------------------------------------------------+
| txfr_X_sn                | rate of mass transferred due to heterogeneous chemical reactions (for all the species)  |
+--------------------------+-----------------------------------------------------------------------------------------+
| txfr_X_sn_[species]      | solids "species" rate of transfer due to heterogeneous reactions (only species          |
|                          | "species" is monitored)                                                                 |
+--------------------------+-----------------------------------------------------------------------------------------+


General particle properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~

General particle properties can be obtained from area (plane) and volume
regions. For area regions, all particles in Eulerian cells that intersect the
plane are used in evaluating the average.

Sum
   +----------------------------------+
   | Lagrangian::GeneralProperty::Sum |
   +----------------------------------+

   The sum of particle property, :math:`\phi_p` in the selected region is
   calculated using the following expression.

   .. math:: \sum_p w_p \phi_p

Min
   +----------------------------------+
   | Lagrangian::GeneralProperty::Min |
   +----------------------------------+

   The minimum value of particle property :math:`phi_p` is the selected region
   is obtained using the following expression.

   .. math:: \min_p \phi_p

Max
   +----------------------------------+
   | Lagrangian::GeneralProperty::Max |
   +----------------------------------+

   The maximum value of particle property :math:`phi_p` is the selected region
   is obtained using the following expression.

   .. math:: \max_p \phi_p


Averaged particle properties
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Particle properties can be averaged over area (plane) and volume regions. For
area regions, all particles in Eulerian cells that intersect the plane are used
in evaluating the average.


Average
   +---------------------------------------+
   | Lagrangian::AveragedProperty::Average |
   +---------------------------------------+

   The average value of particle property, :math:`\phi_p` in the selected region
   is calculated using the following expression. For DEM simulations, the
   statistical weight of a particle, :math:`w_p`, is one such that the sum of
   the weights is the total number of observations in the selected region.

   .. math:: \bar{\phi} = \frac{\sum_p w_p \phi_p}{\sum_p w_p}

Standard Deviation
   +-------------------------------------------------+
   | Lagrangian::AveragedProperty::StandardDeviation |
   +-------------------------------------------------+

   The standard deviation of particle property, :math:`phi_p` in the selected
   region is calculated using the following expression.  :math:`\bar{\phi}` is
   the averaged variable in the selected region.

   .. math:: \sigma_{\phi} = \sqrt{\frac{ \sum_p w_p (\phi_p-\bar{\phi})^2 }{\sum_p w_p}}

Mass-weighted average
   +---------------------------------------------------+
   | Lagrangian::AveragedProperty::MassWeightedAverage |
   +---------------------------------------------------+

   Mass-weighted average value of particle property, :math:`\phi_p` in the
   selected region is calculated using the following expression.

   .. math:: \bar{\phi}_m = \frac{\sum_{p} w_p m_p \phi_p}{\sum_p w_p m_p }

Volume-weighted average
   +-----------------------------------------------------+
   | Lagrangian::AveragedProperty::VolumeWeightedAverage |
   +-----------------------------------------------------+

   Volume-weighted average value of particle property, :math:`\phi_p` in the
   selected region is calculated using the following expression.

   .. math:: \bar{\phi}_v = \frac{\sum_{p} w_p V_p \phi_p}{\sum_p w_p V_p}


Flow rates
~~~~~~~~~~

For Lagrangian monitors of type FlowRate, the flow plane must be specified in
the inputs and it must be defined by one of the regions defined in the regions
inputs. The following input for a monitor [monitor] of type FlowRate can be
used, preceeded by the "mfix.monitors" prefix.

+------------------+-----------------------------------------------------------------------+-------------+-----------+
|                  | Description                                                           |   Type      | Default   |
+==================+=======================================================================+=============+===========+
| [monitor].plane  | defines the plane through which the flow rate of the particles in the |  String     | None      |
|                  | monitoring region [region] will be computed                           |             |           |
+------------------+-----------------------------------------------------------------------+-------------+-----------+


Flow rate monitors for Lagrangian particles (DEM/PIC) are only valid for area
(plane) regions. The set of particles crossing the flow plane, :math:`\Gamma` is
approximated using the height of the plane, :math:`h`, the position of the
particle, :math:`x_p`, and the particle velocity normal to the plane,
:math:`v_p` such that

   .. math:: (v_p)\left(\frac{x_p - h}{\Delta t}\right) > 0

and

   .. math:: \left|v_p\right| \geq  \left| \frac{x_p - h}{\Delta t} \right|


Flow rate
   +--------------------------------+
   | Lagrangian::FlowRate::FlowRate |
   +--------------------------------+

   The net flow rate of a general particle property :math:`\phi_p` is computed
   by summing the properties of the set of particles projected to have crossed
   the flow plane, :math:`\Gamma`.

   .. math:: \sum_{p \in \Gamma} w_p \phi_p \frac{v_p}{\left| v_p \right|}

Mass-weighted flow rate
   +--------------------------------------------+
   | Lagrangian::FlowRate::MassWeightedFlowRate |
   +--------------------------------------------+

   The net mass-weighted flow rate is the sum of the general particle property
   :math:`\phi_p` multiplied by the particle mass, :math:`m_p` of the set of
   particles projected to have crossed the flow plane, :math:`\Gamma`.

   .. math:: \sum_{p \in \Gamma} w_p m_p \phi_p \frac{v_p}{\left| v_p \right|}

Volume-weighted flow rate
   +----------------------------------------------+
   | Lagrangian::FlowRate::VolumeWeightedFlowRate |
   +----------------------------------------------+

   The net volume-weighted flow rate is the sum of the general particle property
   :math:`\phi_p` multiplied by the particle volume, :math:`V_p` of the set of
   particles projected to have crossed the flow plane, :math:`\Gamma`.

   .. math:: \sum_{p \in \Gamma}\phi_p w_p V_p \frac{v_p}{\left| v_p \right|}

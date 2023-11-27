.. _Chap:InputsPICtoDEM:

PIC to DEM conversion
=====================

The PIC to DEM tool allows to convert a checkpoint file obtained from a PIC run
into a new checkpoint file on a custom-refined mesh with DEM particles. The DEM
particles positions are initialized such that the original PIC parcels
distribution (aka the solids volume fraction) is preserved in each cell up to
a negligible error.

Building the PIC to DEM tool using CMake (from inside the build directory):

::

    cmake --build ./ --target pic2dem

The following inputs must be preceded by "pic2dem.":

+------------------------+---------------------------------------------------+--------+---------+
|                        | Description                                       | Type   | Default |
+========================+===================================================+========+=========+
| convert                | Name of the checkpoint file obtained from a       | string | ""      |
|                        | previous PIC run, that will be converted to a DEM |        |         |
|                        | checkpoint file                                   |        |         |
+------------------------+---------------------------------------------------+--------+---------+
| refinement_ratio       | The mesh refinement ratio that will be applied on | int    | 1       |
|                        | each direction to obtain a refined mesh out of    |        |         |
|                        | the one  read form the PIC checkpoint file        |        |         |
+------------------------+---------------------------------------------------+--------+---------+
| eps_tolerance          | The threshold used for DEM particles generation   | Real   | 1.e-15  |
|                        | from the PIC solids volfrac distribution. If ep_s |        |         |
|                        | in a cell is below the threshold, no DEM solids   |        |         |
|                        | will be generated in that cell                    |        |         |
+------------------------+---------------------------------------------------+--------+---------+
| eps_overflow           | An artifact, like a knob, for the user to force   | Real   | 1.0     |
|                        | over-production (if value > 1), or                |        |         |
|                        | under-production (if value < 1) of DEM particles  |        |         |
+------------------------+---------------------------------------------------+--------+---------+
| small_volfrac          | This input gives the possibility to set a small   | Real   | 0.      |
|                        | volfrac value just for the DEM refined case,      |        |         |
|                        | while the standard small volfrac value will still |        |         |
|                        | be used for the PIC case read from the checkpoint |        |         |
|                        | file                                              |        |         |
+------------------------+---------------------------------------------------+--------+---------+
| geom_chk_file          | Name of the EB checkpoint file where the DEM      | string | ""      |
|                        | refined case geometry will be read or written     |        |         |
+------------------------+---------------------------------------------------+--------+---------+
| geom_levelset_chk_file | Name of the EB checkpoint file where the levelset | string | ""      |
|                        | geometry for the DEM refined case will be read or |        |         |
|                        | written                                           |        |         |
+------------------------+---------------------------------------------------+--------+---------+
| geom_chk_write         | Flag to turn on/off writing the EB geometry       | bool   | false   |
|                        | checkpoint file for the DEM refined case          |        |         |
+------------------------+---------------------------------------------------+--------+---------+
| geom_chk_read          | Flag to turn on/off reading the EB geometry       | bool   | false   |
|                        | checkpoint file for the DEM refined case          |        |         |
+------------------------+---------------------------------------------------+--------+---------+
| geometry_filename      | CSG filename that will be used for generating the | string | ""      |
|                        | DEM refined geometry in case the PIC coarse       |        |         |
|                        | geometry is read from  a checkpoint file          |        |         |
+------------------------+---------------------------------------------------+--------+---------+

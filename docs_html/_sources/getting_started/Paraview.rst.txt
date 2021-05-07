Using Paraview
==============

`Paraview <https://www.paraview.org/>`_ is an opensource visualization tool
developed by `Kitware <https://www.kitware.com/>`_. It provides an intuit and
feature rich tool for visualizing simulation data. Kitware provides pre-built
binaries that can be `downloaded here <https://www.paraview.org/download/>`_.


Visualize the embedded boundary
-------------------------------

The solver will save the embedded boundary if ``mfix.write_eb_surface = true``
is set in the inputs file as parallel VTP file named ``eb.pvtp``. The individual
parts corresponding to different grids are saved as ``eb_########.vtp`` files.
To open the ``eb.pvtp`` file, press the open button, browse to the simulation
directory, select the ``eb.pvtp`` file, and press ``OK``. The ``eb.pvtp`` will
be displayed in the ``Pipeline Browser``. Make sure the ``eb.pvtp`` is selected
in ``Pipeline Browser`` and press ``Apply`` on the properties tab. The embedded
boundary will now be visible in the 3D viewer. The color and opacity of the
embedded boundary can be changed on the properties tab.

.. image:: /getting_started/images/paraview_eb.png


Visualize the particles
-----------------------

The solver will write plot files if one of the write frequency options is set
(``amr.plot_int``, ``amr.plot_per_exact``, or ``amr.plot_per_approx``) in
directories that are prefixed with the prefix specified in the inputs file
(``amr.plot_file = 'plt'``). To visualize these particles in Paraview, press
the open button. In the file dialog, browse to the simulation directory and
select the directory group corresponding to the specified prefix. In this
example, the director group is displayed as ``plt...``. If only one plot
directory has been written, select the ``plt#####`` directory. Press ``OK``.

.. image:: /getting_started/images/paraview_browse_plt.png

A dialog will popup asking what reader to use. Select the
``AMReX/BoxLib Particles Reader`` and press ``OK``.

.. image:: /getting_started/images/paraview_reader.png

Press ``Apply`` on the properties tab to read the files. To actually see the
particles, change the ``Representation`` from the default ``Surface`` to
``Point Gaussian``. The particles should now be visible in the 3D view.

.. image:: /getting_started/images/paraview_pt_gauss.png

On the properties tab, the radius of the particles can be changed by moving the
slider or editing the value in the ``Gaussian Radius`` field. The particles can
be colored by different variables by selecting the variable in the drop down.
Additionally, if a group of plot files was opened, the simulation can be
"played" by pressing the play button.

.. image:: /getting_started/images/paraview_pt_gauss_opts.png

Visualize the cells
-------------------

Following the same method to visualize the particles, the cells can be
visualized. The major difference is when the dialog asking what read to use
is displayed, select the ``AMReX/BoxLib Grid Reader`` and press ``OK``. On the
properties tab, select which variables to read (make sure to select ``ep_g``,
we will use this later) and select apply.

.. image:: /getting_started/images/paraview_cells.png

If the simulation has ghost cells, we can remove these cells by applying a
threshold filter. With the ``plt*`` object selected in the Pipeline Browser,
press the ``Threshold`` button. With the ``Threshold1`` object selected in the
Pipeline Browser, select ``ep_g`` as the Scalar, change the Minimum value to
be a little larger than 0 (such as 0.01), and press ``Apply``. All the ghost
cells should now be removed because ``ep_g`` in the ghost cell is exactly 0 and
the normal cells should not have a ``ep_g`` less than maximum packing. You can
still color the cells by any of the field variables while keeping the threshold
variable as ``ep_g``.

.. image:: /getting_started/images/paraview_cells_threshold.png

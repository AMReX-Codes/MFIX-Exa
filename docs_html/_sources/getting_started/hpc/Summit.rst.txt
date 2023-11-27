OLCF Summit
===========

If this is your first time building MFIX-Exa on OLCF's Summit, please 
review the general notes below and `Basics`_ section first.

* To access Summit, you will need an
  `OLCF account <https://my.olcf.ornl.gov/account-application-new>`_
  and an RSA token. 
* The name of hte MFIX-Exa account is ``cfd122`` 
* These instructions build MFIX-Exa on the login nodes using ``-j8`` CPUs. 
  You may have to decrease this value if there is high traffic 
  or you may want to increase this value if you are on a compute 
  node interactively. 
* The cmake instructions compile to a ``build`` directory. 
  The gmake instructions compile to a ``exec`` directory. 
* For the dependencies, it is assumed that you have set the 
  following environment variables:

  .. code:: bash

     export HYPRE_INSTALL_DIR=$HOME/<path/to/my/hypre-install-dir>
     export CSG_INSTALL_DIR=$HOME/<path/to/my/csg-dep-install-dir>
     export CSG_LIB_DIR=$HOME/<path/to/my/csg-lib-install-dir>
     export ASCENT_INSTALL_DIR=$HOME/<path/to/my/ascent-install-dir>

  to a path that you have read/write access to. 
  You will need to recall these paths later if you want to build 
  MFIX-Exa with the optional dependencies. 
* After building the ``mfix`` executable (with cmake), you can 
  build the PIC-to-DEM restarter app by executing the following command 
  in the ``build`` directory

  .. code:: bash

      cmake --build . --target pic2dem


Basics
------

Source code
~~~~~~~~~~~
   
Before building, first obtain a copy of the source code
following the instructions on the 
`MFIX-Exa website. <https://mfix.netl.doe.gov/products/mfix-exa/download/>`_

Modules
~~~~~~~

All of the build instructions below have been tested with the 
following modules

.. code:: bash 

    module load cmake/3.23.2
    module load gcc/9.3.0

Do **NOT** purge your default modules. You do not need to load 
an MPI module, this is handled by the preloaded ``spectrum-mpi`` module.
The GPU-enabled builds additionally require

.. code:: bash 

    module load cuda/11.5.2

Full builds that utilize external dependencies, also require setting 
certain environment variables as discussed below. 


Building MFIX-Exa
-----------------

The commands below are the superbuild instructions, i.e., 
AMReX is built as part of the MFIX-Exa build process. 
To build MFIX-Exa with hypre, csg and/or ascent dependencies, 
you first need to build and install these libraries and their dependencies.
Instructions on building the necessary dependencies are below 
and should be successfully installed first. There are two primary 
methods of building the code ``cmake`` and ``gmake`` which are provided 
seperately below.  

cmake
~~~~~

.. tabs::
   
   .. tab:: CPU

      .. code:: bash

         cmake -DCMAKE_C_COMPILER=gcc \
               -DCMAKE_CXX_COMPILER=g++ \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_GPU_BACKEND=NONE \
               -DAMReX_TINY_PROFILE=no \
               -DMFIX_CSG=no \
               -DMFIX_HYPRE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8

   .. tab:: GPU

      .. code:: bash

         cmake -DCMAKE_C_COMPILER=gcc \
               -DCMAKE_CXX_COMPILER=g++ \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=no \
               -DMFIX_HYPRE=no \
               -DMFIX_GPU_BACKEND=CUDA \
               -DAMReX_CUDA_ARCH=7.0 \
               -DCMAKE_CUDA_ARCHITECTURES="70" \
               -DGPUS_PER_SOCKET=1 \
               -DGPUS_PER_NODE=2 \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8

   .. tab:: CPU-full

      .. code:: bash

         module load mpfr/4.0.2
         module load boost/1.77.0

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_ROOT=$HYPRE_DIR
         export HYPRE_LIBRARIES=$HYPRE_DIR/lib
         export HYPRE_INCLUDE_DIRS=$HYPRE_DIR/include

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/ascent
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/conduit

         export CSG_DIR=$CSG_INSTALL_DIR/csg-deps
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_DIR

         export BOOST_ROOT=$OLCF_BOOST_ROOT

         cmake -DCMAKE_C_COMPILER=gcc \
               -DCMAKE_CXX_COMPILER=g++ \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=yes \
               -DMFIX_HYPRE=yes \
               -DAMReX_ASCENT=yes \
               -DAMReX_CONDUIT=yes \
               -DMFIX_GPU_BACKEND=NONE \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../
         make -j8

   .. tab:: GPU-full

      .. code:: bash

         module load mpfr/4.0.2
         module load boost/1.77.0

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_ROOT=$HYPRE_DIR
         export HYPRE_LIBRARIES=$HYPRE_DIR/lib
         export HYPRE_INCLUDE_DIRS=$HYPRE_DIR/include

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/ascent
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$ASCENT_DIR/lib/cmake/conduit

         export CSG_DIR=$CSG_INSTALL_DIR
         export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_DIR

         export BOOST_ROOT=$OLCF_BOOST_ROOT

         cmake -DCMAKE_C_COMPILER=gcc \
               -DCMAKE_CXX_COMPILER=g++ \
               -DBoost_INCLUDE_DIR="$BOOST_ROOT/include" \
               -DMFIX_MPI=yes \
               -DMFIX_OMP=no \
               -DMFIX_CSG=yes \
               -DMFIX_HYPRE=yes \
               -DAMReX_ASCENT=yes \
               -DAMReX_CONDUIT=yes \
               -DMFIX_GPU_BACKEND=CUDA \
               -DAMReX_CUDA_ARCH=7.0 \
               -DCMAKE_CUDA_ARCHITECTURES="70" \
               -DGPUS_PER_SOCKET=1 \
               -DGPUS_PER_NODE=2 \
               -DAMReX_TINY_PROFILE=no \
               -DCMAKE_BUILD_TYPE=Release \
               ../mfix
         make -j8


gmake
~~~~~
   
.. tabs::
   
   .. tab:: CPU

      .. code:: bash

         make -C exec -j8 \
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=FALSE \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=FALSE \
              USE_HYPRE=FALSE \
              DEBUG=FALSE
         

   .. tab:: GPU

      .. code:: bash
         
         make -C exec -j8 
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=TRUE \
              CUDA_ARCH=7.0 \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=FALSE \
              USE_HYPRE=FALSE \
              DEBUG=FALSE


   .. tab:: CPU-full

      .. code:: bash

         module load mpfr/4.0.2
         module load boost/1.77.0

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_HOME=$HYPRE_DIR

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR

         export CSGEB_HOME=$CSG_LIB_DIR
         export LDFLAGS="-lmpfr -L$CSG_INSTALL_DIR/lib -Wl,-rpath=$CSG_INSTALL_DIR"

         make -C exec -j8 \
              COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=FALSE \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=TRUE \
              USE_HYPRE=TRUE \
              USE_ASCENT=TRUE \
              USE_CONDUIT=TRUE \
              DEBUG=FALSE


   .. tab:: GPU-full

      .. code:: bash
         
         module load mpfr/4.0.2
         module load boost/1.77.0

         export HYPRE_DIR=$HYPRE_INSTALL_DIR
         export HYPRE_HOME=$HYPRE_DIR

         export ASCENT_DIR=$ASCENT_INSTALL_DIR
         export CONDUIT_DIR=$ASCENT_DIR

         export CSGEB_HOME=$CSG_LIB_DIR
         export LDFLAGS="-lmpfr -L$CSG_INSTALL_DIR/lib -Wl,-rpath=$CSG_INSTALL_DIR"

         make -C exec -j8 COMP=gnu \
              USE_MPI=TRUE \
              USE_OMP=FALSE \
              USE_CUDA=TRUE \
              CUDA_ARCH=7.0 \
              USE_TINY_PROFILE=FALSE \
              USE_CSG=TRUE \
              USE_HYPRE=TRUE \
              USE_ASCENT=TRUE \
              USE_CONDUIT=TRUE \
              DEBUG=FALSE




Optional build dependencies
---------------------------

The following dependencies need to be built and installed 
prior to following any of the full build instructions above. 

#. Set environment helpers

   .. code:: bash

      export CC=$(which gcc)
      export CXX=$(which g++)
      export FC=$(which gfortran)
      mkdir $HOME/scratch && cd $HOME/scratch 

.. note:: 
   
   For whatever reason, building hypre with GPU support does not like this. 
   So if you are building everything all at once, start with hypre with cuda 
   and then set your compilers and build the rest (including hypre without cuda).
   

#. HYPRE

   .. tabs::

      .. tab:: CPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            ./configure --prefix=$HYPRE_INSTALL_DIR --with-MPI
            make -j8 install 
            popd

      .. tab:: GPU

         .. code:: bash

            git clone https://github.com/hypre-space/hypre.git
            pushd hypre/src/
            git checkout v2.26.0
            ./configure --prefix=$HYPRE_INSTALL_DIR \
                        --without-superlu \
                        --disable-bigint \
                        --without-openmp \
                        --enable-shared  \
                        --with-MPI \
                        --with-cuda \
                        --with-gpu-arch="70" \
                        --with-cuda-home=$OLCF_CUDA_ROOT \
                        --enable-cusparse \
                        --enable-curand
            make -j8 install 
            popd

#. Catch2

   .. code:: bash

      git clone --depth 1 --branch v2.13.7 https://github.com/catchorg/Catch2
      pushd Catch2/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd

#. GMP

   .. code:: bash

      wget --no-check-certificate https://ftp.gnu.org/gnu/gmp/gmp-6.2.1.tar.xz
      tar -xf gmp-6.2.1.tar.xz
      pushd gmp-6.2.1
      ./configure --prefix=$CSG_INSTALL_DIR
      make -j8 install
      popd

#. CGAL

   .. code:: bash

      git clone --depth 1 --branch v5.3 https://github.com/CGAL/cgal
      pushd cgal/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd


#. PEGTL

   .. code:: bash

      git clone --branch 3.2.2 https://github.com/taocpp/PEGTL
      pushd PEGTL/
      cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_INSTALL_DIR
      cd build/
      make -j8 install
      popd

#. CSG EB library  (**gmake**) 

   For the gmake install instructions, you need to install
   ``libcsgeb`` to ``$CSG_LIB_DIR`` using either cmake or gmake:

   .. tabs::

      .. tab:: cmake

         .. code:: bash

            cd subprojects/csg-eb

            module load boost/1.77.0
            export Boost_INCLUDE_DIR="-I$OLCF_BOOST_ROOT/include"

            export CSG_DIR=$CSG_INSTALL_DIR
            export CMAKE_PREFIX_PATH=$CMAKE_PREFIX_PATH:$CSG_DIR

            cmake -S . -B build -DCMAKE_INSTALL_PREFIX=$CSG_LIB_DIR \
                  -DCMAKE_BUILD_TYPE="Release"
            cd build
            make -j8 install

      .. tab:: gmake

         .. code:: bash

            export CSG_DIR=$CSG_INSTALL_DIR

            make -C subprojects/csg-eb install DESTDIR=$CSG_LIB_DIR \
            BOOST_HOME=$OLCF_BOOST_ROOT \
            PEGTL_HOME=$CSG_DIR \
            CGAL_HOME=$CSG_DIR \
            CATCH2_HOME=$CSG_DIR \
            ENABLE_CGAL=TRUE

#. Conduit

   .. code:: bash

      git clone --recursive https://github.com/LLNL/conduit.git
      pushd conduit/
      git checkout v0.8.6
      mkdir build && cd build
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCMAKE_BUILD_TYPE=Release \
            -DENABLE_OPENMP=OFF \
            -DENABLE_MPI=ON \
            -DENABLE_CUDA=OFF \
            -DCMAKE_C_COMPILER=$(which gcc) \
            -DCMAKE_CXX_COMPILER=$(which g++)
      make -j8 install
      popd

#. Vtk-m

   .. code:: bash

      git clone --branch master https://gitlab.kitware.com/vtk/vtk-m.git
      pushd vtk-m/
      git checkout v1.9.0
      mkdir build && cd build/
      cmake -S ../ -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCMAKE_BUILD_TYPE=Release \
            -DVTKm_ENABLE_OPENMP=OFF \
            -DVTKm_ENABLE_MPI=ON \
            -DVTKm_ENABLE_CUDA=OFF \
            -DVTKm_USE_64BIT_IDS=OFF \
            -DVTKm_USE_DOUBLE_PRECISION=ON \
            -DVTKm_USE_DEFAULT_TYPES_FOR_ASCENT=ON \
            -DVTKm_NO_DEPRECATED_VIRTUAL=ON
      make -j8 install
      popd

#. Ascent

   .. code:: bash

      git clone --recursive https://github.com/Alpine-DAV/ascent.git
      pushd ascent
      git checkout v0.9.0
      mkdir build && cd build/
      cmake -S ../src -DCMAKE_INSTALL_PREFIX=$ASCENT_INSTALL_DIR \
            -DCMAKE_BUILD_TYPE=Release \
            -DCONDUIT_DIR=$ASCENT_INSTALL_DIR \
            -DVTKM_DIR=$ASCENT_INSTALL_DIR \
            -DENABLE_VTKH=ON \
            -DENABLE_FORTRAN=OFF \
            -DENABLE_PYTHON=OFF \
            -DENABLE_DOCS=OFF \
            -DBUILD_SHARED_LIBS=ON
      make -j8 install
      popd


Running Jobs
------------

Common Slurm commands:

* ``bsub runit_cpu.sh`` submit a cpu job to the queue
* ``bjobs -u USER`` check job status of user USER
* ``bkill JOBID`` kill a job with id JOBID
* ``bsub -W 0:20 -nnodes 1 -P <ALLOC>`` grab a node interactively for 20 minutes 

Example run scripts for GPU is below. For CPU-only, 
you remove ``module load cuda``, set ``--gpu_per_rs 0`` and remove ``--bind packed:1`` 
from the run line. 

.. code:: bash

   #!/bin/bash
   #BSUB -P CFD122
   #BSUB -W 00:20
   #BSUB -nnodes 2
   #BSUB -J MFIX
   #BSUB -o MFIXo.%J
   #BSUB -e MFIXe.%J
   module load gcc/9.3.0
   module load cuda/11.5.2
   module load mpfr/4.0.2
   module load boost/1.77.0
   module list
   set -x
   omp=1
   export OMP_NUM_THREADS=${omp}
    
   jsrun --nrs 12 --tasks_per_rs 1 --cpu_per_rs 1 --gpu_per_rs 1 --launch_distribution packed --bind packed:1 ./mfix inputs > screen.txt


